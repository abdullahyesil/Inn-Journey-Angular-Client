import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/authResponse';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
  constructor(private http:HttpClient) { }
url="https://localhost:7171/api/Auths/Login";

  login(email:string, password:string)
  { return this.http.post<AuthResponse>((this.url),
    {
    usernameOrEmail:email,
    password:password
    }).pipe(
        tap(response =>  
            {
           const accessToken = response.token.accessToken;
          const refreshToken = response.token.refreshToken;
          const expiration = response.token.expiration;

          
            const user =new User(
              accessToken,refreshToken, expiration
            );
            debugger;
            console.log("aga"+user.token)
            console.log("agaa")
            this.user.next(user);
        })

    )
  }
}
