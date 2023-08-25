import { Component, OnInit } from '@angular/core';
import { StorageService } from './shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular16';
  constructor(
    private storageService:StorageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.isHidden()
  }
  isHidden():boolean
  {
    if (this.router.url=="/autorization")
    {
      return true
    }
    else 
    {
      return false
    }
  }
  logOut():void
  {
    this.storageService.clearStorage();
    this.router.navigate(["autorization"])
  }
}
