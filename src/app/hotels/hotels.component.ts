import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { HotelModal } from '../model/Entities/hotelmodal';
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
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
maxStar:boolean = null;
maxPrice:boolean = null;
dateSearch:boolean=false;
bosHotel:HotelModal[];

loading:boolean


  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
  ) {
  }


      // #region Service
  ngOnInit() {
    console.log(this.maxPrice)

    this.activatedRoute.params.subscribe({
      next: async (paramas) => {
        this.currentPageNo = parseInt(paramas["pageNo"] ?? 1);
        this.loading = true
        if(this.dateSearch)
        {
            this.hotelService.getHotelsDate(this.checkInDate,this.checkOutDate, this.currentPageNo - 1, this.pageSize).subscribe(response=> {
             
              console.log(response)
              this.Filteredhotel=response.hotels
              this.totalCount = response.Hotels.length > 0 ? response.totalCount : 0;
              this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
              this.pageList = this.calculatePageList();
              console.log("TEST"+this.checkInDate)
              console.log(this.checkOutDate)
              this.loading = false
            })
        }


        else if (this.maxPrice || this.maxPrice !=null || this.maxPrice == false){
          this.loading = true
          this.hotelService.getHotels( null,  this.currentPageNo - 1, this.pageSize ,this.maxPrice).subscribe(
            (data) => {
              // Gelen veriler ile yapılacak işlemler
              this.hotel = data;
              this.Filteredhotel = this.hotel;
              this.totalCount = data.length > 0 ? data[0].totalCount : 0;
              this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
              this.pageList = this.calculatePageList();
              this.loading = false
            },
            (error) => {
              console.error('Hata:', error);
            }
          );
        }
          else if (this.maxStar || this.maxStar != null || this.maxStar == false){
          this.hotelService.getHotels( this.maxStar,  this.currentPageNo - 1, this.pageSize ,null).subscribe(
            (data) => {
              // Gelen veriler ile yapılacak işlemler
              this.hotel = data;
              this.Filteredhotel = this.hotel;
              this.totalCount = data.length > 0 ? data[0].totalCount : 0;
              this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
              this.pageList = this.calculatePageList();   
              this.loading = false         
            },
            (error) => {
              console.error('Hata:', error);
            }
          );
        }

        else {

          this.hotelService.getHotels(this.maxStar, this.currentPageNo - 1, this.pageSize, null).subscribe(data => {
            this.hotel = data;
            this.Filteredhotel = this.hotel;
            this.totalCount = data.length > 0 ? data[0].totalCount : 0;
            this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
            this.pageList = this.calculatePageList();
            this.loading = false
  
          });
  

        }

      }

      
    });

  
    this.selectedLayout = 'horizontal'; // Örneğin, varsayılan olarak 'horizontal' seçili olabilir
  }

      // #region Hesaplama
  calculatePageList(): number[] {
    const pageList: number[] = [];
    const delta = 3; // Gösterilecek sayfa numaralarının aralığı
  
    let startPage = Math.max(1, this.currentPageNo - delta);
    let endPage = Math.min(this.totalPageCount, this.currentPageNo + delta);
  
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }
  
    return pageList;
  }

      // #region Date 

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

    this.maxStar=selectedValue
    this.hotelService.getHotels(this.maxStar ,  this.currentPageNo - 1, this.pageSize).subscribe(
      (data) => {
        // Gelen veriler ile yapılacak işlemler
        this.hotel = data;
        this.Filteredhotel = this.hotel;
        this.totalCount = data.length > 0 ? data[0].totalCount : 0;
        this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
        this.pageList = this.calculatePageList();
      
      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }

  
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
      this.checkOutDate = null; // Check-out tarihini sıfırla
    }

    // Check-out tarihi değiştiğinde check-in tarihini kontrol et
    onCheckOutDateChange(event: any): void { 
      this.checkOutDate = event.value;
      if (this.checkInDate && this.checkInDate >= this.checkOutDate) {  //eğer giriş tarihi çıkış tarihinden büyük ise güvenlik için sıfırla.
        this.checkInDate = null; // Check-in tarihini sıfırla
      }
    }


    tariheGoreGetir(){
      this.loading = true
      console.log(this.checkInDate)
      this.dateSearch=true;
        this.hotelService.getHotelsDate(this.checkInDate,this.checkOutDate, this.currentPageNo - 1, this.pageSize).subscribe((resp) =>  this.Filteredhotel =resp.hotels)
        this.loading = false
      }

    fiyatinaGoreSirala(selectedValue: boolean) {
      this.maxPrice = selectedValue
      console.log(this.maxPrice)

      this.hotelService.getHotels( undefined,  this.currentPageNo - 1, this.pageSize , this.maxPrice).subscribe(
        (data) => {
          // Gelen veriler ile yapılacak işlemler
          this.hotel = data;
          this.Filteredhotel = this.hotel;
          this.totalCount = data.length > 0 ? data[0].totalCount : 0;
          this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);
          this.pageList = this.calculatePageList();
        
        },
        (error) => {
          console.error('Hata:', error);
        }
      );
    }


    onImageError(event: Event): void {
      const target = event.target as HTMLImageElement;
      target.src = 'https://cdn.pixabay.com/photo/2015/09/07/19/12/hotel-928937_1280.jpg';
    }
    

    // #region Menü
    isMenuOpen = false;

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
 //View Görünüm
 
 ListNo: number = 1; // Varsayılan değer
  selectedLayout: 'horizontal' | 'vertical' | null = null;

  setLayout(layout: 'horizontal' | 'vertical') {
    this.selectedLayout = layout;
    this.ListNo = layout === 'horizontal' ? 1 : 2; // Liste numarasını güncelle
  }

  isSelected(layout: 'horizontal' | 'vertical'): boolean {
    return this.selectedLayout === layout;
  }

}
