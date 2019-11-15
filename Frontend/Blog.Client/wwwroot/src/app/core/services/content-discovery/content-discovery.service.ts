import { Injectable } from '@angular/core';
import {IRedTransportDriver} from 'REDTransport/dist/IRedTransportDriver';
import {BlogPost} from "shared/models/blog/blog-post";

@Injectable({
  providedIn: 'root'
})
export class ContentDiscoveryService {

  private redTransportDriver: IRedTransportDriver;

  constructor(redTransportDriver: IRedTransportDriver) {
    this.redTransportDriver = redTransportDriver;
  }

  async getPosts(): Promise<BlogPost[]> {

    return [];
  }
}
