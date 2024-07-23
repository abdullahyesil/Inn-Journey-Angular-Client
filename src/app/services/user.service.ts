import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModal } from '../model/userModal';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string= "https://localhost:7171/api/Users";
  constructor(private http:HttpClient) { }

  getByIdUser(id:string){
    return this.http.get<userModal>(this.url+"/ById/"+id)
   }
   get():Observable<userModal[]>
   {

    return this.http.get<userModal[]>(this.url)
   }

 
}
