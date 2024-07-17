import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { roomTypeModel } from '../model/room-type';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<roomTypeModel[]>
{
  return this.http.get<roomTypeModel[]>(this.url+"/RoomType")
}

getById(id:string): Observable<roomTypeModel>
{
  return this.http.get<roomTypeModel>(this.url+"/RoomType/"+id)
}

add(hotel: roomTypeModel): Observable<any>
{
  return this.http.post<roomTypeModel>(this.url+"/RoomType", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/RoomType/"+id)
}
update(hotel: roomTypeModel): Observable<any>
{
 return this.http.put(this.url+"/RoomType/",hotel)
}

}
