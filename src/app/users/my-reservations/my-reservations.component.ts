import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { reservationModel } from '../../model/reservation';
import { LocalStorageService } from '../../services/localstorage.service';
import { HotelService } from '../../services/hotel.service';
import { HotelModal } from '../../model/hotelmodal';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent{
  hotelModel: HotelModal[]
  myReservation:reservationModel[]
  HotelMap: { [key: string]: any } = {}; 
  constructor(
    private reservationService:ReservationService,
    private localService:LocalStorageService,
    private hotelService:HotelService
    
  ) {

    
this.reservationService.getReservationByUserId(this.localService.getItem("Token").userId).subscribe(resp=> this.myReservation= resp)

this.hotelService.getHotels().subscribe(resp => {
  this.hotelModel=resp;
  this.createHotelMap()

})

  }


  // Kullanıcı ismini yorumlara göstermek için userMap
createHotelMap(): void {
  this.HotelMap = {};
  this.hotelModel.forEach(map => {
    this.HotelMap[map.id] = map;
  });
}

// kullanıcı ismini idye göre getir
getHotelName(userId: string): string {
  const hotel = this.HotelMap[userId];
  return hotel ? hotel.name : "Bilinmeyen Otel";
}


}
