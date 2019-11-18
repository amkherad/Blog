import {ArchivesDiscoveryModel} from "shared/models/discovery/archives/archives-discovery-model";
import {PagesDiscoveryModel} from "shared/models/discovery/pages/pages-discovery-model";
import {PostsDiscoveryModel} from "shared/models/discovery/posts/posts-discovery-model";
import {ResourceReference} from "typings/resource-reference.type";

export interface BlogDiscoveryModel {

  applicationId: string;
  domain: string;
  uniqueIdentifier: string;

  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;

  archives: ArchivesDiscoveryModel | ResourceReference | undefined;
  pages: PagesDiscoveryModel | ResourceReference | undefined;
  posts: PostsDiscoveryModel | ResourceReference | undefined;

}
