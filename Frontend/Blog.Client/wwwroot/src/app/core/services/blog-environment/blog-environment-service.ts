import {Injectable} from '@angular/core';
import {urljoin} from 'url-join';

@Injectable({
  providedIn: 'root'
})
export class BlogEnvironmentService {

  constructor() {
  }

  public isServer(): boolean {

    return false;
  }

  public getVariable(key: string, defaultValue?: any): string | undefined {

    if (!this.isServer()) {
      return localStorage.getItem(key) || defaultValue;
    }

    return defaultValue;
  }

  public setVariable(key: string, value: any): void {
    if (!this.isServer()) {
      localStorage.setItem(key, value);
    }
  }


  public getServiceDiscoveryUri(): string {
    return "~/discovery.json";
  }


  public getPostsDiscoveryUri(): string {
    return "~/posts/discovery.json";
  }

  public getPagesDiscoveryUri(): string {
    return "~/pages/discovery.json";
  }

  public getArchivesDiscoveryUri(): string {
    return "~/archives/discovery.json";
  }

  public normalizePath(path: string, sectionRoot?: string) {

    let root;

    if (sectionRoot) {
      root = sectionRoot.replace('~', '');
    } else {
      root = '';
    }

    if (path.includes('~')) {
      path = path.replace('~', root);
    } else {
      path = root + '/' + path;
    }

    return path;
  }
}
