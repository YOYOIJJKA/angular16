import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';
import { User } from 'src/app/shared/interfaces/user';
import { AutorizationService } from 'src/app/shared/services/autorization.service';
import { PostServiceService } from 'src/app/shared/services/post-service.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  id: number | null = null;
  postForm!: FormGroup;
  users!: User[];
  autorization:boolean = false;
  constructor
    (
      private formBuilder: FormBuilder,
      private httpPostService: PostServiceService,
      private storageService: StorageService,
      private router: Router,
      private httpAutorizationService: AutorizationService
    ) { }
  ngOnInit(): void {
    this.getData()

  }
  getData(): void {
    const controls = {
      title: [null, [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁё]*")]],
      body: [null, [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁё]*")]]
    }
    this.postForm = this.formBuilder.group(controls)
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
  addPost(): void {
    const post: Post = this.postForm.value;
    post.author = this.storageService.getLogin();
    this.httpPostService.postPost(post).subscribe({
      error: (e) => console.error(e),
      complete: () => console.log("posted")
    })
    this.router.navigate([""]);
  }
} 