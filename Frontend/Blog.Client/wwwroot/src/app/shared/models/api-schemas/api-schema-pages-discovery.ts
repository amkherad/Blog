import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {PagesDiscoveryModel} from "shared/models/discovery/pages/pages-discovery-model";

export class ApiSchemaPagesDiscovery extends ApiSchemaBase<PagesDiscoveryModel> {
  constructor(uri: string, applicationId: string, uniqueIdentifier: string) {
    super(uri, applicationId, uniqueIdentifier);
  }
}
