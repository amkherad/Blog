import {Injectable} from '@angular/core';
import {RestClientService} from "core/services/rest-client/rest-client.service";
import {BlogDiscoveryModel} from "shared/models/discovery/blog/blog-discovery-model";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";
import {PostsDiscoveryModel} from "shared/models/discovery/posts/posts-discovery-model";
import {PagesDiscoveryModel} from "shared/models/discovery/pages/pages-discovery-model";
import {ArchivesDiscoveryModel} from "shared/models/discovery/archives/archives-discovery-model";
import {ApiSchemaBlogDiscovery} from "shared/models/api-schemas/api-schema-blog-discovery";
import {ApiSchemaPostsDiscovery} from "shared/models/api-schemas/api-schema-posts-discovery";
import {ApiSchemaPagesDiscovery} from "shared/models/api-schemas/api-schema-pages-discovery";
import {ApiSchemaArchivesDiscovery} from "shared/models/api-schemas/api-schema-archives-discovery";
import {ResourceReferenceExtended} from "typings/resource-reference.type";

@Injectable({
  providedIn: 'root'
})
export class ContentDiscoveryService {

  private blogEnvironment: BlogEnvironmentService;
  private restClient: RestClientService;

  private static blogDiscovery?: BlogDiscoveryModel;

  constructor(
    restClient: RestClientService,
    blogEnvironment: BlogEnvironmentService
  ) {
    this.restClient = restClient;
    this.blogEnvironment = blogEnvironment;
  }

  async getBlogInformation(): Promise<BlogDiscoveryModel> {

    if (typeof ContentDiscoveryService.blogDiscovery !== 'undefined') {
      return ContentDiscoveryService.blogDiscovery;
    }

    let discoveryUrl = this.blogEnvironment.getServiceDiscoveryUri();

    discoveryUrl = this.blogEnvironment.normalizePath(discoveryUrl, 'api');

    const discovery = await this.restClient.apiCall(
      new ApiSchemaBlogDiscovery(discoveryUrl)
    );

    ContentDiscoveryService.blogDiscovery = discovery;

    return discovery;
  }

  async getPostsDiscoveryInfo(): Promise<PostsDiscoveryModel> {

    const blogInfo = await this.getBlogInformation();

    let discoveryUrl;
    let discoveryHash: string | undefined = undefined;

    if (blogInfo.posts) {
      const posts = blogInfo.posts;

      if (typeof posts === 'object') {
        if (typeof (posts as ResourceReferenceExtended).uri === 'string') {
          discoveryUrl = (posts as ResourceReferenceExtended).uri;
          discoveryHash = (posts as ResourceReferenceExtended).hash;
        } else if (typeof (posts as PostsDiscoveryModel).posts === 'object') {
          return (posts as PostsDiscoveryModel);
        } else {
          discoveryUrl = this.blogEnvironment.getPostsDiscoveryUri();
        }
      } else if (typeof posts === 'string') {
        discoveryUrl = posts;
      }
    } else {
      discoveryUrl = this.blogEnvironment.getPostsDiscoveryUri();
    }

    discoveryUrl = this.blogEnvironment.normalizePath(discoveryUrl, 'api');

    const result = await this.restClient.apiCall(
      new ApiSchemaPostsDiscovery(
        discoveryUrl,
        blogInfo.applicationId,
        blogInfo.uniqueIdentifier
      )
    );

    return result;
  }

  async getPagesDiscoveryInfo(): Promise<PagesDiscoveryModel> {

    const blogInfo = await this.getBlogInformation();

    const discoveryUrl = this.blogEnvironment.getPagesDiscoveryUri();

    const result = await this.restClient.apiCall(
      new ApiSchemaPostsDiscovery(
        discoveryUrl,
        blogInfo.applicationId,
        blogInfo.uniqueIdentifier
      )
    );

    return result;
  }

  async getArchivesDiscoveryInfo(): Promise<ArchivesDiscoveryModel> {

    const blogInfo = await this.getBlogInformation();

    const discoveryUrl = this.blogEnvironment.getArchivesDiscoveryUri();

    const result = await this.restClient.apiCall(
      new ApiSchemaPostsDiscovery(
        discoveryUrl,
        blogInfo.applicationId,
        blogInfo.uniqueIdentifier
      )
    );

    return result;
  }
}
