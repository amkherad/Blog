import {DateTime} from "typings/date-time.type";

export interface BlogPostModel {

  id: string;

  title: string;
  subtitle: string;
  brief?: string;
  author: string;
  createdDateTime: DateTime;

  readMore: boolean;

  htmlContent: string;

}

export const isBlogPostModel = (post: any): post is BlogPostModel => {
  return (post as BlogPostModel).createdDateTime !== 'undefined';
};
