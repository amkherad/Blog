import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogPostPageComponent} from "components/blog-post-page/blog-post-page.component";
import {SearchPageComponent} from "components/search-page/search-page.component";
import {BlogArchiveComponent} from "components/blog-archive/blog-archive.component";
import {BlogHomePageComponent} from "components/blog-home-page/blog-home-page.component";


const routes: Routes = [
  {
    path: 'post/:date/:id/:text',
    component: BlogPostPageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'archive',
    component: BlogArchiveComponent,
    children: [
      {
        path: ':date',
        component: BlogArchiveComponent,
        children: [
          {
            path: ':id/:text',
            component: BlogArchiveComponent,
          }
        ]
      }
    ]
  },
  {
    path: '',
    component: BlogHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
