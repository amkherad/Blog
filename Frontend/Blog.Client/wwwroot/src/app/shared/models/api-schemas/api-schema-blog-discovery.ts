import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {BlogDiscoveryModel} from "shared/models/discovery/blog/blog-discovery-model";

export class ApiSchemaBlogDiscovery extends ApiSchemaBase<BlogDiscoveryModel> {
  constructor(uri: string) {
    super(uri);
  }
}
