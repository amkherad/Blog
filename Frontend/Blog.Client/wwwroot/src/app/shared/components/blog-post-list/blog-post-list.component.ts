import {Input, Component, OnInit} from '@angular/core';
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {BlogNameGeneratorService} from "core/services/blog-name-generator/blog-name-generator.service";

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  private blogNameGeneratorService: BlogNameGeneratorService;

  @Input()
  private posts: BlogPostModel[];

  constructor(blogNameGeneratorService: BlogNameGeneratorService) {
    this.blogNameGeneratorService = blogNameGeneratorService;
  }

  ngOnInit() {
  }

  getLink(post: BlogPostModel): string {
    return this.blogNameGeneratorService.generateLink(post);
  }
}
