import { Injectable } from '@angular/core';
import { IRedTransportDriver } from 'redtransport/dist/IRedTransportDriver';
import { RedTransportDriver } from 'redtransport/dist/RedTransportDriver';

@Injectable({
  providedIn: 'root'
})
export class RestClientService extends RedTransportDriver implements IRedTransportDriver {

  constructor() {

    super('');
  }


}
