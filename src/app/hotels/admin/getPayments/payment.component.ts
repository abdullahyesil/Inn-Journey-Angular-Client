import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { HotelService } from '../../../services/hotel.service';
import { HotelModal } from '../../../model/Entities/hotelmodal';
import { PaymentModel } from '../../../model/Entities/payment';
import { LocalStorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  myHotel: HotelModal[] = [];
  paymentModal: PaymentModel[] = [];
  first: number = 0;
  rows: number = 10;
  totalCount: number = 0;

  constructor(
    private paymentService: PaymentService,
    private hotelService: HotelService,
    private localService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const userId = this.localService.getItem("Token")?.userId;
    if (userId) {
      this.hotelService.getMyHotels(userId).subscribe(resp => {
        this.myHotel = resp;
      });
    }
  }

  onHotelSelect(event: Event): void {
    const selectedHotelId = (event.target as HTMLSelectElement).value;
    console.log(selectedHotelId); // Test
    this.loadReviews(selectedHotelId, this.first, this.rows);
  }

  loadReviews(selectedHotelId: string, page: number, size: number): void {
    this.paymentService.getByHotelId(selectedHotelId, page, size).subscribe(res => {
      this.paymentModal = res; 
      this.totalCount = res[0].totalCount; // Toplam kayıt sayısını güncelleyin
    });
  }

  onPageChange(event: any): void {
    this.first = event.first; // Sayfa başlangıç indeksini güncelle
    this.rows = event.rows; // Sayfa başına öğe sayısını güncelle
    const page = this.first / this.rows; // Sayfa numarasını hesapla
    this.loadReviews(this.myHotel[0]?.id, page, this.rows); // Yeni verileri yükle (myHotel[0]?.id örnek olarak alındı, uygun bir ID kullanılmalı)
  }
}
