import {Injectable} from '@angular/core';
import {DateTime} from "typings/date-time.type";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() {
  }

  public parseDateTime(dateTime: DateTime): Date {
    if (typeof dateTime === 'undefined') {
      throw new Error('Date and time is undefined.');
    }

    if (
      typeof dateTime === 'number' ||
      typeof dateTime === 'string' ||
      (typeof dateTime === 'object' && dateTime instanceof Date)
    ) {
      return new Date(dateTime);
    }

    throw new Error('Invalid date time format.');
  }

  public formatUrlDateTime(dateTime: Date): string {
    if (typeof dateTime === 'undefined') {
      throw new Error('Argument null of type Date was passed to the method.');
    }

    const year = dateTime.getFullYear().toString();
    const month = dateTime.getMonth().toString().padStart(2, '0');
    const day = dateTime.getDay().toString().padStart(2, '0');
    // const hour = dateTime.getHours().toString().padStart(2, '0');
    // const minute = dateTime.getMinutes().toString().padStart(2, '0');
    // const second = dateTime.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatDateTime(dateTime: Date): string {
    if (typeof dateTime === 'undefined') {
      throw new Error('Argument null of type Date was passed to the method.');
    }

    return `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDay()}`;
  }
}
