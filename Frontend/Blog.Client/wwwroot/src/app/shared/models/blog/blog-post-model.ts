import {DateTime} from "typings/date-time.type";

export interface BlogPostModel {

  title: string;
  subtitle: string;
  author: string;
  createdDateTime: DateTime;

  htmlContent: string;

}
