import {Inject, Injectable} from '@angular/core';
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {RestClientService} from "core/services/rest-client/rest-client.service";
import {BlogDiscoveryModel} from "shared/models/discovery/blog/blog-discovery-model";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";

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

    const discovery = await this.restClient.get<BlogDiscoveryModel>({
      url: rootDiscovery
    });

    ContentDiscoveryService.blogDiscovery = discovery;

    return discovery;
  }

  async getPosts(): Promise<BlogPostModel[]> {

    return [];
  }
}
