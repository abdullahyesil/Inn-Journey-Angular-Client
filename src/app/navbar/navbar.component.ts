import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';
import { Subscriber } from 'rxjs';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
 isActive:boolean;
  isLogin:boolean = false;
  userName:string;
  constructor( private localService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){

  
    
  }
  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe(status => {
      this.isLogin = status;
    });

    if(this.localService.getItem("Token") !=null)
     
    this.userService.getByIdUser(this.localService.getItem("Token").userId).subscribe(data => this.userName = data.name );

  }

  logOut(){
    this.localService.removeItem("Token")
    this.router.navigate(["/login"]);
    this.authService.logout();
  }

}
