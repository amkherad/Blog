import {Inject, Injectable} from '@angular/core';
import {DateTime} from "typings/date-time.type";
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {DateTimeService} from "core/services/generals/date-time.service";

@Injectable({
  providedIn: 'root'
})
export class BlogNameGeneratorService {

  private dateTimeService: DateTimeService;

  constructor(dateTimeService: DateTimeService) {
    this.dateTimeService = dateTimeService;
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

  private generateUrlId(post: BlogPostModel): string {
    return post.id;
  }

  private generateUrlTitle(post: BlogPostModel): string {
    const postTitle = post.title.replace(' ', '_');

    return postTitle;
  }

  public generateLink(post: BlogPostModel): string {

    const date = this.dateTimeService.parseDateTime(post.createdDateTime);

    const datePart = this.dateTimeService.formatUrlDateTime(date);

    const idPart = this.generateUrlId(post);

    const titlePart = this.generateUrlTitle(post);

    return `post/${datePart}/${idPart}/${titlePart}`;
  }
}
