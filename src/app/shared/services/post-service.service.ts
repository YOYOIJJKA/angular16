import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(
    private http:HttpClient
  ) { }
  postPost(post:Post):Observable<Post>
  {
    return this.http.post<Post>(`http://localhost:3000/posts/`, post)
  }
  getPosts():Observable<Post[]>
  {
    return this.http.get<Post[]>(`http://localhost:3000/posts/`);
  }
  getPost(id:number):Observable<Post>
  {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`);
  }
}

