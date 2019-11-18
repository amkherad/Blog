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

    const rootDiscovery = this.blogEnvironment.getServiceDiscoveryUri();

    const discovery = await this.restClient.apiCall(
      new ApiSchemaBlogDiscovery(rootDiscovery)
    );

    ContentDiscoveryService.blogDiscovery = discovery;

    return discovery;
  }

  async getPostsDiscoveryInfo(): Promise<PostsDiscoveryModel> {

    const blogInfo = await this.getBlogInformation();

    const discoveryUrl = this.blogEnvironment.getServiceDiscoveryUri();

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

    const discoveryUrl = this.blogEnvironment.getServiceDiscoveryUri();

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

    const discoveryUrl = this.blogEnvironment.getServiceDiscoveryUri();

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
