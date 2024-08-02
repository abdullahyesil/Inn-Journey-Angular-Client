import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { reservationModel } from '../../model/Entities/reservation';
import { LocalStorageService } from '../../services/localstorage.service';
import { HotelService } from '../../services/hotel.service';
import { HotelModal } from '../../model/Entities/hotelmodal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  errorMessage: string = "";
  hotelModel: { [key: string]: HotelModal } = {}; // Değişiklik: hotelModel bir harita oldu
  myReservation: reservationModel[] = [];

  constructor(
    private reservationService: ReservationService,
    private localService: LocalStorageService,
    private hotelService: HotelService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservationByUserId(this.localService.getItem("Token").userId).subscribe(resp => {
      this.myReservation = resp;
      this.loadHotelDetails();
    });
  }

  loadHotelDetails(): void {
    const hotelIds = Array.from(new Set(this.myReservation.map(reservation => reservation.hotelId))); // Tekil otel ID'leri al
    hotelIds.forEach(hotelId => {
      this.hotelService.getHotelById(hotelId).subscribe(resp => {
        this.hotelModel[hotelId] = resp; // Her oteli ID'ye göre sakla
      });
    });
  }

  getHotelName(hotelId: string): string {
    const hotel = this.hotelModel[hotelId];
    return hotel ? hotel.name : "Bilinmeyen Otel";
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PC':
        return 'active';
      case 'PNC':
        return 'inactive';
      default:
        return '';
    }
  }

  cancelReservation(reservation: reservationModel): void {
    if (reservation.id != null) {
      reservation.deleted = true;
      this.reservationService.update(reservation).subscribe(response => {
        if (response.success) {
          this._snackBar.open('Randevu Başarıyla İptal Edildi.', '', { duration: 5000 });
        } else {
          this._snackBar.open('Randevu iptal edilirken bir hata oluştu: ' + response.message, '', { duration: 5000 });
        }
      });
    }
  }
}
