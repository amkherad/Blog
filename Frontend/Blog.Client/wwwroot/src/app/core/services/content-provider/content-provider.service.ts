import {Inject, Injectable} from '@angular/core';
import {ContentDiscoveryService} from "../content-discovery/content-discovery.service";
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {RestClientService} from "core/services/rest-client/rest-client.service";

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private contentDiscoveryService: ContentDiscoveryService;
  private restClient: RestClientService;

  constructor(
    @Inject(RestClientService) restClient: RestClientService,
    @Inject(ContentDiscoveryService) contentDiscoveryService: ContentDiscoveryService
  ) {
    this.restClient = restClient;
    this.contentDiscoveryService = contentDiscoveryService;
  }

  async transformResponse(response: Response) {

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

  }

  async getPost(uri: string, queries?: Record<string, string>): Promise<BlogPostModel> {

    const response = await this.restClient.get<Response>({
      url: '',
    });

    const contentType = response.headers["content-type"];

    if (typeof contentType === 'undefined') {
      throw new Error('RedTransportDriver returned an undefined response.');
    }

    const result = await this.transformResponse(response);

    return Promise.resolve({
      title: 'test',
      subtitle: 'test',
      author: 'test',
      createdDateTime: 'test',
      htmlContent: 'test',
    } as BlogPostModel);
  }
}
