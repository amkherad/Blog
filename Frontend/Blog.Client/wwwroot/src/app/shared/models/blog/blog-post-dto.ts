import {DateTime} from "typings/date-time.type";
import {ContentDescriptor} from "typings/content-descriptor.type";
import {ContentLoaderDescriptor} from "typings/content-loader-descriptor.type";

export interface BlogPostDto {

  id: string;

  title: string;
  subtitle: string;
  brief?: string;
  author: string;
  createdDateTime: DateTime;

  loader?: ContentLoaderDescriptor;

  readMore: boolean;

  content: ContentDescriptor;

}

export const isBlogPostDto = (post: any): post is BlogPostDto => {
  return (post as BlogPostDto).createdDateTime !== 'undefined';
};
