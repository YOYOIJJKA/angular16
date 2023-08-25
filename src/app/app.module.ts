import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";
import { AutorizationComponent } from './components/autorization/autorization.component';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostListComponent,
    PostItemComponent,
    AutorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
