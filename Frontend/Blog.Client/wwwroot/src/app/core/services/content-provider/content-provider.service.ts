import {Inject, Injectable} from '@angular/core';
import {urljoin} from "url-join";
import {ContentDiscoveryService} from "../content-discovery/content-discovery.service";
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {RestClientService} from "core/services/rest-client/rest-client.service";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";
import {BlogPostDto} from "shared/models/discovery/posts/blog-post-dto";
import {ApiSchemaGetPost} from "shared/models/api-schemas/api-schema-get-post";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private blogEnvironmentService: BlogEnvironmentService;
  private contentDiscoveryService: ContentDiscoveryService;
  private restClient: RestClientService;

  constructor(
    @Inject(RestClientService) restClient: RestClientService,
    @Inject(BlogEnvironmentService) blogEnvironmentService: BlogEnvironmentService,
    @Inject(ContentDiscoveryService) contentDiscoveryService: ContentDiscoveryService
  ) {
    this.restClient = restClient;
    this.blogEnvironmentService = blogEnvironmentService;
    this.contentDiscoveryService = contentDiscoveryService;
  }

  async transformResponse(response: Response): Promise<string> {

    const contentType = response.headers["content-type"];

    let contentTypeStr = contentType.toString();

    const semicolon = contentTypeStr.indexOf(';');
    if (typeof semicolon !== 'undefined' && semicolon >= 0) {
      contentTypeStr = contentTypeStr.substr(0, semicolon);
    }

    switch (contentTypeStr) {
      case undefined: {

        break;
      }
      case 'text/json':
      case 'application/json': {

        break;
      }
      case 'text/xml':
      case 'application/xml': {

        break;
      }
      case 'text/markdown':
      case 'text/blog-markdown':
      case 'text/markdown+extended': {

      }
      default: {

      }
    }

    return '';
  }

  async getPosts(loadContent: boolean): Promise<BlogPostModel[]> {

    //const blogInfo = await this.contentDiscoveryService.getBlogInformation();

    const postsInfo = await this.contentDiscoveryService.getPostsDiscoveryInfo();

    const transformedPosts: BlogPostModel[] = [];
    if (postsInfo && postsInfo.posts) {
      for (const post of postsInfo.posts) {

        let result = {
          title: post.title,
          subtitle: post.subtitle,
          createdDateTime: post.createdDateTime,
          author: post.author,
          htmlContent: post.brief
        } as BlogPostModel;

        if (loadContent || typeof post.brief === 'undefined') {
          try {
            console.log(post);
            result = await this.getPost(post);
          } catch (ex) {
            console.error(':: An error occured while trying to fetch post data:', ex);
          }
        }

        transformedPosts.push(result);
      }
    }

    return transformedPosts;
  }

  async getPost(post: BlogPostModel | BlogPostDto): Promise<BlogPostModel> {

    const blogInfo = await this.contentDiscoveryService.getBlogInformation();

    const postsInfo = await this.contentDiscoveryService.getPostsDiscoveryInfo();

    if (!post.id) {
      throw new Error('Property `id` is required in the post\'s meta data.');
    }

    const postUri = this.blogEnvironmentService.normalizePath(post.id, postsInfo.lookupRootDirectory);

    const response = await this.restClient.get({
      uri: postUri,
      query: {
        applicationId: blogInfo.applicationId,
        uniqueIdentifier: blogInfo.uniqueIdentifier
      }
    });

    const contentType = response.headers["content-type"];

    if (typeof contentType === 'undefined') {
      throw new Error('RedTransportDriver returned an undefined response.');
    }

    const result = await this.transformResponse(response);

    return {
      ...post,
      htmlContent: result
    };
  }
}
