import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AutorizationComponent } from './components/autorization/autorization.component';

const routes: Routes = [
  {
    path:"",
    component:PostListComponent,
  },
  {
    path:"create_post",
    component:PostFormComponent,
  },
  {
    path:"redact_post/:id",
    component:PostItemComponent
  }, 
  {
    path:"autorization",
    component:AutorizationComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
