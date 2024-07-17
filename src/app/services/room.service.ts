import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roomModel } from '../model/room';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<roomModel[]>
{
  return this.http.get<roomModel[]>(this.url+"/Room")
}

getById(id:string): Observable<roomModel>
{
  return this.http.get<roomModel>(this.url+"/Room/"+id)
}

add(hotel: roomModel): Observable<any>
{
  return this.http.post<roomModel>(this.url+"/Room", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Room/"+id)
}
update(hotel: roomModel): Observable<any>
{
 return this.http.put(this.url+"/Room/",hotel)
}
}
