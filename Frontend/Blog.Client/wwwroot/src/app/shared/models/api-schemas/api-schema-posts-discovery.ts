import {ApiSchemaBase} from "shared/models/api-schemas/api-schema-base";
import {PostsDiscoveryModel} from "shared/models/discovery/posts/posts-discovery-model";

export class ApiSchemaPostsDiscovery extends ApiSchemaBase<any, PostsDiscoveryModel> {
  constructor(uri: string, applicationId: string, uniqueIdentifier: string) {
    super(uri, applicationId, uniqueIdentifier);
  }
}
