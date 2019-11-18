import {Injectable} from '@angular/core';
import {urljoin} from 'url-join';

@Injectable({
  providedIn: 'root'
})
export class BlogEnvironmentService {

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
    return "api/discovery.json";
  }


  getPostsDiscoveryUri(): string {
    return "api/posts/discovery.json";
  }

  getPagesDiscoveryUri(): string {
    return "api/pages/discovery.json";
  }

  getArchivesDiscoveryUri(): string {
    return "api/archives/discovery.json";
  }

  normalizePath(path: string, sectionRoot?: string) {

    let root;

    if (sectionRoot) {
      root = sectionRoot.replace('~', '');
    } else {
      root = '';
    }

    if (path.includes('~')) {
      path = path.replace('~', root);
    } else {
      path = urljoin(root, path);
    }

    return path;
  }
}
