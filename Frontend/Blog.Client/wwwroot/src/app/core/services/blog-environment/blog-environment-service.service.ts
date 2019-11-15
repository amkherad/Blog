import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogEnvironmentServiceService {

  constructor() {
  }

  isServer(): boolean {

    return false;
  }

  getVariable(key: string, defaultValue?: any): string | undefined {

    if (!this.isServer()) {
      return localStorage.getItem(key) || defaultValue;
    }

    return defaultValue;
  }

  setVariable(key: string, value: any): void {
    if (!this.isServer()) {
      localStorage.setItem(key, value);
    }
  }


  getServiceDiscoveryUri(): string {
    return "content-discovery.json";
  }


  getPostsUri(): string {
    return "";
  }

  getPagesUri(): string {
    return "";
  }

  getArchive(): string {
    return "";
  }
}
