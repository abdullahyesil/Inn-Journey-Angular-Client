import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { reviewModel } from '../model/review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }
  
get(): Observable<reviewModel[]>
{
  return this.http.get<reviewModel[]>(this.url+"/Review")
}

getById(id:string): Observable<reviewModel>
{
  return this.http.get<reviewModel>(this.url+"/Review/"+id)
}

add(hotel: reviewModel): Observable<any>
{
  return this.http.post<reviewModel>(this.url+"/Review", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Review/"+id)
}
update(hotel: reviewModel): Observable<any>
{
 return this.http.put(this.url+"/Review/",hotel)
}

}
