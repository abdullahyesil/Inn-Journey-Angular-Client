import { Component, inject, OnInit } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import { HotelModal } from '../../../../model/hotelmodal';
import { MatDialog } from '@angular/material/dialog';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrl: './my-hotels.component.scss'
})
export class MyHotelsComponent implements OnInit {

   readonly dialog = inject(MatDialog);
  userId: string = "asd";
  myHotel: HotelModal[] = [];
  constructor(private hotelService: HotelService){}
  ngOnInit(): void {
        this.hotelService.getMyHotels(this.userId).subscribe(data => this.myHotel=data);
  }


  openDialog(hotelId:string) {
    const dialogRef = this.dialog.open(EditHotelComponent,{data: hotelId});
    dialogRef.afterClosed().subscribe(result => {
        
    });

  }
}
