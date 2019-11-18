import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {BlogPostDto} from "shared/models/discovery/posts/blog-post-dto";

export class ApiSchemaGetPost extends ApiSchemaBase<BlogPostDto> {
  constructor(uri: string, applicationId: string, uniqueIdentifier: string) {
    super(uri, applicationId, uniqueIdentifier);
  }
}
