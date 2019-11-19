import {Inject, Injectable} from '@angular/core';
import {urljoin} from "url-join";
import {ContentDiscoveryService} from "../content-discovery/content-discovery.service";
import {BlogPostModel, isBlogPostModel} from "shared/models/blog/blog-post-model";
import {RestClientService} from "core/services/rest-client/rest-client.service";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";
import {BlogPostUrlParams, isBlogPostUrlParams} from "shared/models/blog/blog-post-url-params";
import {DateTimeService} from "core/services/generals/date-time.service";
import {BlogNameGeneratorService} from "core/services/blog-name-generator/blog-name-generator.service";
import {
  ContentDescriptor,
  ContentDescriptorReference,
  isContentDescriptor,
  isContentDescriptorResolved
} from "typings/content-descriptor.type";
import {isResourceReferenceExtended} from "typings/resource-reference.type";
import {BlogDiscoveryModel} from "shared/models/discovery/blog/blog-discovery-model";
import {PostsDiscoveryModel} from "shared/models/discovery/posts/posts-discovery-model";
import {BlogPostDto, isBlogPostDto} from "shared/models/blog/blog-post-dto";


@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private blogEnvironmentService: BlogEnvironmentService;
  private contentDiscoveryService: ContentDiscoveryService;
  private restClientService: RestClientService;
  private dateTimeService: DateTimeService;
  private blogNameGeneratorService: BlogNameGeneratorService;

  constructor(
    restClient: RestClientService,
    blogEnvironmentService: BlogEnvironmentService,
    contentDiscoveryService: ContentDiscoveryService,
    dateTimeService: DateTimeService,
    blogNameGeneratorService: BlogNameGeneratorService
  ) {
    this.restClientService = restClient;
    this.blogEnvironmentService = blogEnvironmentService;
    this.contentDiscoveryService = contentDiscoveryService;
    this.dateTimeService = dateTimeService;
    this.blogNameGeneratorService = blogNameGeneratorService;
  }

  async transformResponse(contentType: string, content: string): Promise<string> {

    let contentTypeStr = contentType.toString();

    const semicolon = contentTypeStr.indexOf(';');
    if (typeof semicolon !== 'undefined' && semicolon >= 0) {
      contentTypeStr = contentTypeStr.substr(0, semicolon);
    }

    switch (contentTypeStr) {
      case undefined: {
        return '<strong>Not found!</strong>';
      }
      case 'text/json':
      case 'application/json': {

        break;
      }
      case 'text/html':
      case 'text/xhtml':
      case 'text/x-html': {

        break;
      }
      case 'text/xml':
      case 'application/xml': {

        break;
      }
      case 'text/markdown':
      case 'text/blog-markdown':
      case 'text/markdown+extended': {

        break;
      }
      default: {
        return content;
      }
    }
  }

  async getPosts(loadContent: boolean): Promise<BlogPostModel[]> {

    //const blogInfo = await this.contentDiscoveryService.getBlogInformation();

    const postsInfo = await this.contentDiscoveryService.getPostsDiscoveryInfo();

    const transformedPosts: BlogPostModel[] = [];
    if (postsInfo && postsInfo.posts) {
      for (const postKey in postsInfo.posts) {
        if (postsInfo.posts.hasOwnProperty(postKey)) {

          const post = postsInfo.posts[postKey];

          let result = {
            ...post,
            htmlContent: post.brief
          } as BlogPostModel;

          if (loadContent || typeof post.brief === 'undefined') {
            try {
              result = await this.getPost(post);
            } catch (ex) {
              console.error(':: An error occured while trying to fetch post data:', ex);
            }
          }

          transformedPosts.push(result);
        }
      }
    }

    return transformedPosts;
  }

  protected async getPostBody(
    blogInfo: BlogDiscoveryModel,
    postsInfo: PostsDiscoveryModel,
    content: ContentDescriptor,
    queryParams?: Record<string, any>
  ): Promise<string> {

    let path;

    if (typeof content === 'string') {
      path = content;
    } else if (isContentDescriptorResolved(content)) {

      return await this.transformResponse(content.contentType, content.content);

    } else if (isResourceReferenceExtended(content)) {
      path = content.uri;
    }

    const postUri = this.blogEnvironmentService.normalizePath(
      path,
      postsInfo.lookupRootDirectory
    );

    const response = await this.restClientService.get({
      uri: postUri,
      query: {
        ...queryParams,
        applicationId: blogInfo.applicationId,
        uniqueIdentifier: blogInfo.uniqueIdentifier,
      }
    });

    let contentType = response.headers["Content-Type"];

    if (typeof contentType === 'undefined') {
      contentType = 'text/plain';
    }

    const bodyText = await response.text();

    return await this.transformResponse(contentType, bodyText);

  }

  async getPost(post: BlogPostModel | BlogPostDto | BlogPostUrlParams): Promise<BlogPostModel> {

    const blogInfo = await this.contentDiscoveryService.getBlogInformation();

    const postsInfo = await this.contentDiscoveryService.getPostsDiscoveryInfo();

    if (!post.id) {
      throw new Error('Property `id` is required in the post\'s meta data.');
    }

    const queryParams: Record<string, any> = {
      id: post.id
    };

    if (isBlogPostUrlParams(post)) {

      const dateTime = this.dateTimeService.parseDateTime(post.date);
      queryParams.date = this.dateTimeService.formatDateTime(dateTime);
      queryParams.text = post.text;

      const posts = await this.contentDiscoveryService.getPostsDiscoveryInfo(queryParams);

      const pst = posts.posts[post.id];

      const body = await this.getPostBody(blogInfo, postsInfo, pst.content, queryParams);

      return {
        ...pst,
        htmlContent: body
      };

    } else if (isBlogPostDto(post)) {

      const dateTime = this.dateTimeService.parseDateTime(post.createdDateTime);
      queryParams.date = this.dateTimeService.formatDateTime(dateTime);
      queryParams.text = this.blogNameGeneratorService.generateUrlTitle(post);

      const body = await this.getPostBody(blogInfo, postsInfo, post.content, queryParams);

      return {
        ...post,
        htmlContent: body
      };

    } else if (isBlogPostModel(post)) {
      return {...post};

    } else {

      throw new Error('Invalid post.');

    }
  }
}
