import { Input, Component, OnInit } from '@angular/core';
import {BlogPostModel} from "shared/models/blog/blog-post-model";

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  @Input()
  private posts: BlogPostModel[];

  constructor() {
  }

  ngOnInit() {
  }

}
