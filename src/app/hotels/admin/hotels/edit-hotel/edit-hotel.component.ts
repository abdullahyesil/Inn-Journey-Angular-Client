import { Component, Inject, OnInit } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import { HotelModal } from '../../../../model/hotelmodal';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.scss'
})
export class EditHotelComponent implements OnInit{
  hotelModal:HotelModal;
  public hotelForm:FormGroup

  constructor(
private hotelService: HotelService,
private formBuilder: FormBuilder, // FormBuilder eklenmesi
@Inject(MAT_DIALOG_DATA) public data: string //güncelleme işlemine postları aktarmak için data
){
  console.log(this.data)  
  this.hotelService.getHotelById(this.data).subscribe(data => {this.hotelModal = data 
    this.updateForm(); // Formu güncelleme metodu
    }
  );
  this.hotelForm = this.formBuilder.group({
    id: ['' , Validators.required],
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


  updateForm(): void {
    this.hotelForm.patchValue({
      id: this.hotelModal.id ?? '',
      name: this.hotelModal.name ?? '', // Null kontrolü ve boş string atama
      address: this.hotelModal.address ?? '',
      phone: this.hotelModal.phone ?? '',
      email: this.hotelModal.email ?? '',
      description: this.hotelModal.description ?? '',
      star: this.hotelModal.star ?? null, // Star için null bırakıyoruz
      imageUrl: this.hotelModal.imageUrl ?? ''
    });
  }

  updateMyHotel(){

    console.log(this.hotelForm.value)

    if (this.hotelForm.valid) {
      console.log(this.hotelForm.value);
      this.hotelService.updateHotel(this.hotelForm.value).subscribe(response => console.log(response))
    } else {
      console.log('Form geçersiz');
    }
  }
}
