import { Injectable } from '@angular/core';
import { IRedTransportDriver } from 'REDTransport/dist/IRedTransportDriver';
import { RedTransportDriver } from 'REDTransport/dist/RedTransportDriver';

@Injectable({
  providedIn: 'root'
})
export class RestClientService extends RedTransportDriver implements IRedTransportDriver {

  constructor() {

    super('');
  }


}
