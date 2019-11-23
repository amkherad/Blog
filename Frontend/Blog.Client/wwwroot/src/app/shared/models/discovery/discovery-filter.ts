import {DiscoveryModel} from "shared/models/discovery/discovery-model";
import {DateTime} from "typings/date-time.type";

export class DiscoveryFilter<TModel extends DiscoveryModel> {

  id?: string;

  snapshot?: DateTime;
  offset?: number;
  limit?: number;

  [key: string]: any;

}
