import {ResourceReference} from "typings/resource-reference.type";
import {DateTime} from "typings/date-time.type";

export class BlogPostDto {

  title: string;
  subtitle: string;
  brief?: string;
  author: string;
  createdDateTime: DateTime;

  reference: ResourceReference;

}
