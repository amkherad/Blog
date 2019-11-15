import {Component, OnInit} from '@angular/core';
import {ContentDiscoveryService} from "core/services/content-discovery/content-discovery.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private contentDiscovery: ContentDiscoveryService;


  private title: string;


  constructor(
    contentDiscovery: ContentDiscoveryService
  ) {
    this.contentDiscovery = contentDiscovery;
  }


  async ngOnInit(): Promise<void> {

    const blogInfo = await this.contentDiscovery.getBlogInformation();

    this.title = blogInfo.blogTitle;

  }
}
