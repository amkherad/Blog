import { Injectable } from '@angular/core';
import {BlogMarkdownTransformStream} from "./blog-md/blog-markdown-transform-stream";

@Injectable({
  providedIn: 'root'
})
export class BlogMarkdownTransformService {

  constructor() { }

  transform(response: Response): BlogMarkdownTransformStream {
    return new BlogMarkdownTransformStream(response.body);
  }
}
