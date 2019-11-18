import {DateTime} from "typings/date-time.type";

export interface BlogPostModel {

  id: string;

  title: string;
  subtitle: string;
  author: string;
  createdDateTime: DateTime;

  brief?: string;

  htmlContent: string;

}
