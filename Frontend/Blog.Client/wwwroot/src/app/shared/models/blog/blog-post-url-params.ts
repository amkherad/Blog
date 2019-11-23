import {DateTime} from "typings/date-time.type";

export interface BlogPostUrlParams {

  date: DateTime;
  id: string;
  text: string;

}

export const isBlogPostUrlParams = (post: any): post is BlogPostUrlParams => {
  return (post as BlogPostUrlParams).date !== 'undefined';
};
