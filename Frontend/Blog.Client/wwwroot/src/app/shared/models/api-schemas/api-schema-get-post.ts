import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {BlogPostDto} from "shared/models/blog/blog-post-dto";
import {PagesDiscoveryModel} from "shared/models/discovery/pages/pages-discovery-model";

export class ApiSchemaGetPost extends ApiSchemaBase<any, BlogPostDto> {
  constructor(uri: string, applicationId: string, uniqueIdentifier: string) {
    super(uri, applicationId, uniqueIdentifier);
  }
}
