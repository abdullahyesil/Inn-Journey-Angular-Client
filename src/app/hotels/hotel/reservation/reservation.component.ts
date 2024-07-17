import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { roomTypeModel } from '../../../model/room-type';
import { roomModel } from '../../../model/room';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { RoomTypeService } from '../../../services/room-type.service';
import { ReservationService } from '../../../services/reservation.service';
import { reservationModel } from '../../../model/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {


  hotelId: string //Parametreden aldıgım idyi atamak için oluşturuldu.
  roomType: roomTypeModel[];
  Room: roomModel[];
  totalPrice: number;
  range: FormGroup; // FormGroup tanımı
  selectedRoom: any = null;
  roomPricePerNight: number = 0;
  reservationModel: reservationModel;
  public reservationForm:FormGroup
  // Check-in ve check-out tarihlerini saklayan değişkenler
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;

  // Check-in tarihini seçerken bugünden sonraki ve check-out tarihinden önceki günler seçilebilir
  checkInFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkOut = this.checkOutDate ? new Date(this.checkOutDate) : null;
    if (checkOut) {
      checkOut.setHours(0, 0, 0, 0);
    }
    return (d || today) >= today && (!checkOut || (d || today) < checkOut);
  };

  // Check-out tarihini seçerken sadece check-in tarihinden sonraki günler seçilebilir
  checkOutFilter = (d: Date | null): boolean => {
    if (!this.checkInDate) {
      return true; // Eğer check-in tarihi seçilmemişse, tüm tarihler seçilebilir
    }
    const checkIn = new Date(this.checkInDate);
    checkIn.setHours(0, 0, 0, 0);
    return (d || checkIn) > checkIn;
  };

  // Check-in tarihi seçildiğinde check-out tarihini sıfırla
  onCheckInDateChange(event: any): void {
    this.checkInDate = event.value;
    this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapla
    this.checkOutDate = null; // Check-out tarihini sıfırla
  }

  // Check-out tarihi değiştiğinde check-in tarihini kontrol et
  onCheckOutDateChange(event: any): void { 
    this.checkOutDate = event.value;
    this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapl
    if (this.checkInDate && this.checkInDate >= this.checkOutDate) {  //eğer giriş tarihi çıkış tarihinden büyük ise güvenlik için sıfırla.
      this.checkInDate = null; // Check-in tarihini sıfırla
      this.totalPrice = this.calculateTotalPrice(); // Toplam fiyatı hesapla
    }
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { hotelId: string },
    private roomService: RoomService, //oda bilgilerini çekmek için room servisini çağırdık
    private roomTypeService: RoomTypeService,
    private formBuilder: FormBuilder, // FormBuilder eklenmesi
    private reservationService: ReservationService,
   

  ) {
    this.hotelId = data.hotelId; //aldigimiz idyi hotelId'ye aktardık.
    this.range = new FormGroup({  //İki adet tarih nesnesini grup olarak interface tanımladık.
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
 
    this.reservationForm = this.formBuilder.group({ //model ile göndermek için Form oluşturduk. Validator ile null kontrolü yaptık.
      userId: ['', Validators.required],
      hotelId: ['', Validators.required],
      roomId: [null, Validators.required],
      checkIn: [null, Validators.required],
      checkOut: [null, Validators.required]
    });

  }


  ngOnInit(
  ): void {
    this.roomService.get().subscribe(rooms => {
      console.log(rooms)

      console.log('Injected hotelId:', this.hotelId); // hotelId'nin doğru gelip gelmediğini kontrol edin

      // Oda bilgilerini aldıktan sonra, hotelId ile filtreleriz
      this.Room = rooms.filter(room => room.hotelId === this.hotelId);

      this.roomTypeService.get().subscribe(roomType =>
        this.roomType = roomType
      );
    });


  }


  getRoomTypeName(roomTypeId: string): string { // Oda isimlerini. Oda tiplerinin yanına getirdik
    if (this.roomType && this.roomType.length > 0) {
      const roomType = this.roomType.find(rt => rt.id === roomTypeId);
      return roomType ? roomType.name : '';
    } else {
      return 'Bir hata oluştu';
    }
  }

  // Oda seçiminde değişiklik olduğunda oda fiyatını güncelleyen fonksiyon
  onSelectionChange(selectedRoomId: string): void {
    this.selectedRoom = this.Room.find(room => room.id === selectedRoomId); 
    this.roomPricePerNight = this.selectedRoom ? this.selectedRoom.basePrice : 0;
    this.totalPrice = this.calculateTotalPrice();
  }

  
  // Check-in ve check-out tarihleri arasındaki gün sayısını hesaplayan fonksiyon
 
  calculateTotalPrice(): number {
    if (this.checkInDate && this.checkOutDate && this.roomPricePerNight) {
      const checkIn = new Date(this.checkInDate).setHours(0, 0, 0, 0); //saatleri 0a çektik düzgün hesaplama için
      const checkOut = new Date(this.checkOutDate).setHours(0, 0, 0, 0);
      const diffInTime = checkOut - checkIn;  //Aradaki zamanı bulmak için
      const diffInDays = diffInTime / (1000 * 3600 * 24); //Fiyat hesaplama için zaman hesabı: 24 Saatte bir artıyor fiyat
      return diffInDays * this.roomPricePerNight;
    }
    return 0;
  }


  addReservation(): void{
      
    console.log(this.reservationForm.value)
    // this.reservationService.add(rModel).subscribe(response => console.log(response))

    
    }
  
}
