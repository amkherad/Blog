import { Injectable } from '@angular/core';
import {BlogMarkdownParser} from "core/services/blog-markdown-transform/blog-md/parser/blog-markdown-parser";
import {ContentTransformation} from "core/services/generals/content-transformation";

@Injectable({
  providedIn: 'root'
})
export class BlogMarkdownTransformService implements ContentTransformation {

  private parser: BlogMarkdownParser;

  constructor() {
    this.parser = new BlogMarkdownParser();
  }

  async transform(response: Response): Promise<string> {

    const body = await response.text();

    const result = this.parser.transform(body);

    return result;
  }
}
