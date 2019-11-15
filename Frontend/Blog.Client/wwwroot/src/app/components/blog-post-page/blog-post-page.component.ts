import {Component, Inject, OnInit} from '@angular/core';
import {ContentProviderService} from "core/services/content-provider/content-provider.service";

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.scss']
})
export class BlogPostPageComponent implements OnInit {

  private contentProviderService : ContentProviderService;

  constructor(
    @Inject(ContentProviderService) contentProviderService : ContentProviderService
  ) {
    this.contentProviderService = contentProviderService;
  }

  async ngOnInit() {

    //const post = await this.contentProviderService.getPost()
  }

}
