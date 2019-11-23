import {DiscoveryModel} from "shared/models/discovery/discovery-model";

export interface ArchivesDiscoveryModel extends DiscoveryModel {

  archives: Record<string, string>;

}
