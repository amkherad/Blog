import {DateTime} from "typings/date-time.type";
import {ContentDescriptor} from "typings/content-descriptor";

export interface BlogPostDto {

  id: string;

  title: string;
  subtitle: string;
  brief?: string;
  author: string;
  createdDateTime: DateTime;

  content: ContentDescriptor;

}
