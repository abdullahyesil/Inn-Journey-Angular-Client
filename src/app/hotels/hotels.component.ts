import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { HotelModal } from '../model/hotelmodal';
import { User } from '../model/user';
import { LocalStorageService } from '../services/localstorage.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {


  hotel: HotelModal[] = [];
  filterText: string = "";
  Filteredhotel: HotelModal[];
  currentPageNo: number;
  totalPageCount: number;
  totalCount: number;
  pageSize: number = 12;
  pageList: number[] = [];



  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: async (paramas) => {
        this.currentPageNo = parseInt(paramas["pageNo"] ?? 1);


        this.hotelService.getHotels(false, this.currentPageNo - 1, this.pageSize).subscribe(data => {
          this.hotel = data;
          this.Filteredhotel = this.hotel;
          const totalCount = data.length > 0 ? data[0].totalCount : 0;

          this.totalCount = totalCount


          this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
          this.pageList = [];


          if (this.currentPageNo - 3 <= 0) {
            for (let i = 1; i <= 7; i++)
              this.pageList.push(i);
          }

          else if (this.currentPageNo + 3 >= this.totalPageCount) {
            for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
              this.pageList.push(i);
          }

          else {
            for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
              this.pageList.push(i);
          }
        });

      }
    });
  }



  onInputChange() {
    if (this.filterText && this.hotel) {
      const filterTextLower = this.filterText.toLowerCase();
      this.Filteredhotel = this.hotel.filter(m =>
        m.name.toLowerCase().indexOf(filterTextLower) !== -1);
    } else {
      this.Filteredhotel = this.hotel; // filterText veya hotel boş ise, tüm otelleri göster
    }
  }

  generateAdditionalStars(starRating: number): string {
    let stars = '';
    const fullStars = Math.floor(starRating);
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fa fa-star" aria-hidden="true"></i> ';
    }
    return stars;
  }

  getStarArray(hotel: HotelModal): number[] {
    return Array(hotel.star || 0).fill(0);
  }


  onSortOrderChange(selectedValue: boolean) {
    // Servis fonksiyonunu çağır
    // Servis fonksiyonunu çağır
    this.hotelService.getHotels(selectedValue).subscribe(
      (data) => {
        // Gelen veriler ile yapılacak işlemler
        this.hotel = data;
        this.Filteredhotel = this.hotel;
      },
      (error) => {
        console.error('Hata:', error);
      }
    );

  }
}
