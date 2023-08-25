import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { PostServiceService } from 'src/app/shared/services/post-service.service';
import { Router  } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { AutorizationService } from 'src/app/shared/services/autorization.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts!: Post[];
  users!:User[];
  autorization:boolean = false;
  constructor
    (
      private httpPostService: PostServiceService,
      private httpAutorizationService:AutorizationService,
      private storageService:StorageService,
      private router:Router
  ) { }
  ngOnInit(): void {
    this.getAllPosts();
    this.httpAutorizationService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.users.forEach(user => {
          if ((user.password) == (this.storageService.getPassword()) && (user.login) == (this.storageService.getLogin())) {
            this.autorization = true;
          }
        });
        if (this.autorization==false) {
          console.log("checked");
          this.router.navigate(["autorization"])
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info(`Я нашёл юзеров ${this.users}`)
    })
  }
  getAllPosts(): void {
    this.httpPostService.getPosts().subscribe({
      next: (posts: Post[]) => {
      this.posts = posts;
      },
      error: (e) => console.error(e),
      complete: () => console.info(`Я нашёл посты ${this.posts}`)
      })
  }
  goToPost(id?:number) {
    this.router.navigate([this.router.url,"redact_post",id])
  }
}