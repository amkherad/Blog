import {Inject, Injectable} from '@angular/core';
import {ContentDiscoveryService} from "../content-discovery/content-discovery.service";
import {BlogPost} from "shared/models/blog/blog-post";
import {IRedTransportDriver} from 'REDTransport/dist/IRedTransportDriver';
import {RedTransportDriver} from 'REDTransport/dist/RedTransportDriver';

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  private contentDiscoveryService: ContentDiscoveryService;
  private redTransportDriver: IRedTransportDriver;

  constructor(
    @Inject(RedTransportDriver) redTransportDriver: IRedTransportDriver,
    @Inject(ContentDiscoveryService) contentDiscoveryService: ContentDiscoveryService
  ) {
    this.redTransportDriver = redTransportDriver;
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

  async getPost(uri: string, queries?: Record<string, string>): Promise<BlogPost> {

    const response = await this.redTransportDriver.get<Response>({
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
    } as BlogPost);
  }
}
