import {Component, ContentChild, Inject, OnInit} from '@angular/core';
import {ContentProviderService} from "core/services/content-provider/content-provider.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateTime} from "typings/date-time.type";
import {BlogPostUrlParams} from "shared/models/blog/blog-post-url-params";
import {BlogPostModel} from "shared/models/blog/blog-post-model";

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss']
})
export class BlogPostPageComponent implements OnInit {

  private route: ActivatedRoute;
  private contentProviderService : ContentProviderService;

  private postDate: DateTime;
  private postId: string;
  private postUrlText: string;

  private post: BlogPostModel;
  private postHtmlContent: string;

  constructor(
    route: ActivatedRoute,
    contentProviderService : ContentProviderService
  ) {
    this.route = route;
    this.contentProviderService = contentProviderService;
  }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.postDate = params.date;
      this.postId = params.id;
      this.postUrlText = params.text;
    });

    const post = await this.contentProviderService.getPost({
      id: this.postId,
      date: this.postDate,
      text: this.postUrlText
    } as BlogPostUrlParams);

    console.log('post.htmlContent', post.htmlContent);

    this.post = post;
    this.postHtmlContent = post.htmlContent;

  }
}
