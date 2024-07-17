import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModal } from '../../../../model/hotelmodal';
import { HotelService } from '../../../../services/hotel.service';
import { roomTypeModel } from '../../../../model/room-type';
import { RoomTypeService } from '../../../../services/room-type.service';
import { RoomService } from '../../../../services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent implements OnInit {

public roomForm: FormGroup
public myHotels:HotelModal[]
public userId:string ="asd";
public roomType:roomTypeModel[];

  constructor(
    private formBuilder: FormBuilder,
    private hotelsService:HotelService,
    private roomTypeService: RoomTypeService,
    private roomService: RoomService
  ){


this.roomTypeService.get().subscribe(response => this.roomType=response);

    this.hotelsService.getMyHotels(this.userId).subscribe(data => this.myHotels=data);
    this.roomForm = this.formBuilder.group({
      hotelId: ['', Validators.required],
      roomTypeId: ['', Validators.required],
      basePrice: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });

  }
  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.roomForm.value);
    this.roomService.add(this.roomForm.value).subscribe(response=> console.log(response));
  
  }

}
