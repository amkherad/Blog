import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {BlogDiscoveryModel} from "shared/models/discovery/blog/blog-discovery-model";
import {PagesDiscoveryModel} from "shared/models/discovery/pages/pages-discovery-model";

export class ApiSchemaBlogDiscovery extends ApiSchemaBase<any, BlogDiscoveryModel> {
  constructor(uri: string) {
    super(uri);
  }
}
