import {Inject, Injectable} from '@angular/core';
import {DateTime} from "typings/date-time.type";
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {DateTimeService} from "core/services/generals/date-time.service";
import {BlogPostDto} from "shared/models/blog/blog-post-dto";
import {BlogPostUrlParams} from "shared/models/blog/blog-post-url-params";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";

@Injectable({
  providedIn: 'root'
})
export class BlogNameGeneratorService {

  private dateTimeService: DateTimeService;
  private blogEnvironmentService: BlogEnvironmentService;

  constructor(
    dateTimeService: DateTimeService,
    blogEnvironmentService: BlogEnvironmentService) {
    this.dateTimeService = dateTimeService;
    this.blogEnvironmentService = blogEnvironmentService;
  }

  // generateName(post: BlogPostModel): string {
  //
  //   const postId = this.generateUrlId(post);
  //
  //   const date = this.dateTimeService.parseDateTime(post.createdDateTime);
  //
  //   const postDateTime = this.dateTimeService.formatUrlDateTime(date);
  //
  //   let name = `${postDateTime}_${postId}`;
  //
  //   name = name.replace(' ', '_');
  //
  //   return name;
  // }

  public generateUrlId(post: BlogPostModel | BlogPostDto): string {
    return post.id;
  }

  public generateUrlTitle(post: BlogPostModel | BlogPostDto): string {
    const postTitle = post.title.replace(' ', '_');

    return postTitle;
  }

  public generateDate(post: BlogPostModel | BlogPostDto): DateTime {

    const date = this.dateTimeService.parseDateTime(post.createdDateTime);

    const datePart = this.dateTimeService.formatUrlDateTime(date);

    return datePart;
  }

  public generateUrlParams(post: BlogPostModel | BlogPostDto): BlogPostUrlParams {
    return {
      id: this.generateUrlId(post),
      text: this.generateUrlTitle(post),
      date: this.generateDate(post)
    };
  }

  public generateLink(post: BlogPostModel | BlogPostDto): string {

    const datePart = this.generateDate(post);

    const idPart = this.generateUrlId(post);

    const titlePart = this.generateUrlTitle(post);

    return `post/${datePart}/${idPart}/${titlePart}`;
  }
}
