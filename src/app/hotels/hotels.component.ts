import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { HotelModal } from '../model/hotelmodal';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {


    hotel:HotelModal[] = [];
    filterText:string =""; 
    Filteredhotel:HotelModal[];
  constructor(private hotelService: HotelService){
  }
  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotel= data;
      this.Filteredhotel = this.hotel;
      console.log(data);
    });
    }


    onInputChange() {
      if (this.filterText && this.hotel) {
        const filterTextLower = this.filterText.toLowerCase();
        this.Filteredhotel = this.hotel.filter(m =>
          m.name.toLowerCase().indexOf(filterTextLower) !== -1 );
      } else {
        this.Filteredhotel = this.hotel; // filterText veya hotel boş ise, tüm otelleri göster
      }
    }
}
