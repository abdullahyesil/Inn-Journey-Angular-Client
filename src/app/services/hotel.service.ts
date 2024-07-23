import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelModal } from '../model/hotelmodal';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  url:string ="https://localhost:7171/api";
  constructor(private http: HttpClient) { }


getHotels(): Observable<HotelModal[]>
{
  return this.http.get<HotelModal[]>(this.url+"/Hotels")
}

getHotelById(id:string): Observable<HotelModal>
{
  return this.http.get<HotelModal>(this.url+"/Hotels/"+id)
}

addHotel(hotel: HotelModal): Observable<any>
{
  return this.http.post<HotelModal>(this.url+"/Hotels", hotel)
}
deleteHotel(id:string): Observable<any>
{
  return this.http.delete(this.url+"/Hotels/"+id)
}
updateHotel(hotel: HotelModal): Observable<any>
{
 return this.http.put(this.url+"/Hotels/",hotel)
}

getMyHotels(userId:string): Observable<HotelModal[]>
{
  return this.http.get<HotelModal[]>(this.url+"/Hotels/myHotels/"+ userId)
}



}
