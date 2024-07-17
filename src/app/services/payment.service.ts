import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentModel } from '../model/payment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }


get(): Observable<PaymentModel[]>
{
  return this.http.get<PaymentModel[]>(this.url+"/Payment")
}

getById(id:string): Observable<PaymentModel>
{
  return this.http.get<PaymentModel>(this.url+"/Payment/"+id)
}

add(hotel: PaymentModel): Observable<any>
{
  return this.http.post<PaymentModel>(this.url+"/Payment", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Payment/"+id)
}
update(hotel: PaymentModel): Observable<any>
{
 return this.http.put(this.url+"/Payment/",hotel)
}


}
