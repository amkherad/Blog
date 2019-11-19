import {Component, OnInit} from '@angular/core';
import {BlogPostModel} from "shared/models/blog/blog-post-model";
import {ContentDiscoveryService} from "core/services/content-discovery/content-discovery.service";
import {ContentProviderService} from "core/services/content-provider/content-provider.service";

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.scss']
})
export class BlogHomePageComponent implements OnInit {

  private contentDiscoveryService: ContentDiscoveryService;
  private contentProviderService: ContentProviderService;

  posts: BlogPostModel[];

  constructor(
    contentDiscoveryService: ContentDiscoveryService,
    contentProviderService: ContentProviderService
  ) {
    this.contentDiscoveryService = contentDiscoveryService;
    this.contentProviderService = contentProviderService;
  }

  async ngOnInit() {

    const posts = await this.contentProviderService.getPosts(false);

    this.posts = posts;

  }

}
