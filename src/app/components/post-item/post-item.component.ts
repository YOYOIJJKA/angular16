import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/shared/services/post-service.service';
import { Post } from 'src/app/shared/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { AutorizationService } from 'src/app/shared/services/autorization.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  id: number | null = null;
  post!: Post;
  users!:User[];
  autorization:boolean = false;
  constructor
    (
      private httpPostService: PostServiceService,
      private activatedRoute: ActivatedRoute,
      private httpAutorizationService:AutorizationService,
      private storageService:StorageService,
      private router:Router
    ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.getData()
    })
  }
  getData(): void {
    this.getPost()
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
  getPost(): void {
    console.log(this.id)
    if (this.id) {

      this.httpPostService.getPost(this.id).subscribe({
        next: (post: Post) => {
          this.post = post;
        },
        error: (e) => console.error(e),
        complete: () => console.info(`Я нашел пост ${this.post}`)
      })
    }
  }
}