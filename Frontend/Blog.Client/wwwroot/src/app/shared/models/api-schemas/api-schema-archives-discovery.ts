import {ArchivesDiscoveryModel} from "shared/models/discovery/archives/archives-discovery-model";
import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";

export class ApiSchemaArchivesDiscovery extends ApiSchemaBase<ArchivesDiscoveryModel> {
  constructor(uri: string, applicationId: string, uniqueIdentifier: string) {
    super(uri, applicationId, uniqueIdentifier);
  }
}
