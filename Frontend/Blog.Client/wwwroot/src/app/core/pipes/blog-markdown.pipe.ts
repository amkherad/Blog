import { Pipe, PipeTransform } from '@angular/core';
import {BlogMarkdownTransformService} from "core/services/blog-markdown-transform/blog-markdown-transform.service";

@Pipe({
  name: 'blogMarkdown'
})
export class BlogMarkdownPipe implements PipeTransform {

  private blogMarkdownTransformService: BlogMarkdownTransformService;

  constructor(blogMarkdownTransformService: BlogMarkdownTransformService) {
    this.blogMarkdownTransformService = blogMarkdownTransformService;
  }

  transform(value: any, ...args: any[]): any {

    if (typeof value === 'string') {

    } else if (typeof value === 'object' && value instanceof Response) {

    } else {
      throw new Error('Unknown value type passed to BlogMarkdownPipe.transform().');
    }

    return null;
  }

}
