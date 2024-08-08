import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../../services/reservation.service';
import { reservationModel } from '../../../../model/Entities/reservation';
import { ActivatedRoute } from '@angular/router';
import { userModal } from '../../../../model/Entities/userModal';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomersComponent } from '../../customers/customers.component';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrl: './get-reservations.component.scss'
})
export class GetReservationsComponent implements OnInit{

  hotelId:string="string";
  myHotelRezervation :reservationModel[] = []; 
  userModel:userModal[] = [];

  constructor(
    private rezervationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
this.activatedRoute.params.subscribe(params=> {
  this.rezervationService.getByHotelRezervation(params["id"]).subscribe(data => {
    this.myHotelRezervation = data
    this.loadUsersName(this.myHotelRezervation.map(resp => resp.userId));
  });
});
}


loadUsersName(userId: string[]): void {
  if (userId.length > 0) {
    this.userService.getByIdsUser(userId).subscribe(resp => {
      this.userModel = resp.users;
    });
  }
}

getUsersName(id: string): string {
  const user = this.userModel.find(u => u.id === id);
  return user ? ("Kullanıcı Adı: "+user.userName) : 'Bilinmeyen Kullanıcı';
}

getUser(userId:string):void{
  this.dialog.open(CustomersComponent, {data: userId})

}




}
