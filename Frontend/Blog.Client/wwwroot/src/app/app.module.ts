import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';

import {RestClientService} from "core/services/rest-client/rest-client.service";
import {BlogEnvironmentService} from "core/services/blog-environment/blog-environment-service";
import {ContentProviderService} from "core/services/content-provider/content-provider.service";
import {ContentDiscoveryService} from "core/services/content-discovery/content-discovery.service";

import { BlogPostPageComponent } from 'components/blog-post-page/blog-post-page.component';
import { SearchPageComponent } from 'components/search-page/search-page.component';
import { BlogArchiveComponent } from 'components/blog-archive/blog-archive.component';
import {BlogPostListComponent} from "shared/components/blog-post-list/blog-post-list.component";

@NgModule({
  declarations: [
    AppComponent,
    BlogPostPageComponent,
    SearchPageComponent,
    BlogArchiveComponent,
    BlogPostListComponent,
    BlogPostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    RestClientService,
    BlogEnvironmentService,
    ContentProviderService,
    ContentDiscoveryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
