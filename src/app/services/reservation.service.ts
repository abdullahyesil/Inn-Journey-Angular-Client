import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservationModel } from '../model/reservation';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }


get(): Observable<reservationModel[]>
{
  return this.http.get<reservationModel[]>(this.url+"/Reservation")
}

getById(id:string): Observable<reservationModel>
{
  return this.http.get<reservationModel>(this.url+"/Reservation/"+id)
}

add(hotel: reservationModel): Observable<any>
{
  return this.http.post<reservationModel>(this.url+"/Reservation", hotel)
}
delete(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Reservation/"+id)
}
update(hotel: reservationModel): Observable<any>
{
 return this.http.put(this.url+"/Reservation/",hotel)
}

getByHotelRezervation(hotelId:string):Observable<reservationModel[]>{
return this.http.get<reservationModel[]>(this.url+"/Reservation/hotel/"+hotelId)
}


}
