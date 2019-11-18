import {Component, OnInit} from '@angular/core';
import {ContentDiscoveryService} from "core/services/content-discovery/content-discovery.service";
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {ContentProviderService} from "core/services/content-provider/content-provider.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private contentDiscovery: ContentDiscoveryService;
  private contentProvider: ContentProviderService;

  applicationId: string;
  uniqueIdentifier: string;
  domain: string;
  title: string;
  subtitle: string;
  description: string;

  posts: BlogPostModel[];


  constructor(
    contentDiscovery: ContentDiscoveryService,
    contentProvider: ContentProviderService
  ) {
    this.contentDiscovery = contentDiscovery;
    this.contentProvider = contentProvider;
  }


  async ngOnInit(): Promise<void> {

    const blogInfo = await this.contentDiscovery.getBlogInformation();

    const posts = await this.contentProvider.getPosts(false);

    this.applicationId = blogInfo.applicationId;
    this.uniqueIdentifier = blogInfo.uniqueIdentifier;
    this.domain = blogInfo.domain;

    this.title = blogInfo.blogTitle;
    this.subtitle = blogInfo.blogSubtitle;
    this.description = blogInfo.blogDescription;

    this.posts = posts;

  }
}
