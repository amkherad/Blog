import { Injectable } from '@angular/core';
import { IRedTransportDriver } from 'redtransport/dist/IRedTransportDriver';
import { RedTransportDriver } from 'redtransport/dist/RedTransportDriver';
import {IRestClientService} from "core/services/rest-client/irest-client.service";

@Injectable({
  providedIn: 'root'
})
export class RestClientService extends RedTransportDriver implements IRedTransportDriver, IRestClientService {

  constructor() {

    super('');
  }


}
