import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelModal } from '../../../../model/hotelmodal';
import { HotelService } from '../../../../services/hotel.service';
import { LocalStorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent implements OnInit {
  public hotelForm:FormGroup
  public userId:string
  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private localService:LocalStorageService
  ){
    this.userId=localService.getItem("Token").userId

    this.hotelForm = this.formBuilder.group({
      userId: [this.userId , Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email doğrulaması ekledik
      description: ['', Validators.required],
      star: [null, [Validators.required, Validators.min(1), Validators.max(7)]], // Min ve Max doğrulaması ekledik
      imageUrl: ['', Validators.required]
    });


  }

  ngOnInit(): void {

  }
  


  addHotel(){
    if (this.hotelForm.valid) {
        this.hotelService.addHotel(this.hotelForm.value).subscribe(response => console.log(response))

    }

  }
}
