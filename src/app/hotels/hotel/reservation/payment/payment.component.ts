import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../../services/reservation.service';
import { reservationModel } from '../../../../model/reservation';
import { PaymentService } from '../../../../services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModel } from '../../../../model/payment';
import { ValidationService } from '../../../../services/validation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup
  paymentModel: PaymentModel
  reservationModal: reservationModel
  successEkrani = false // Ödeme başarılı olursa yeni component açmadan aynı sayfada işlem yapalım
  constructor(
    private activatedRoot: ActivatedRoute,
    private reservationService: ReservationService,
    private payService: PaymentService,
    private fb: FormBuilder,

  ) {


    this.paymentForm = this.fb.group({
      id: ["", Validators.required],
      userId: ["", Validators.required],
      roomId: ["", Validators.required],
      hotelId: ["", Validators.required],
      checkIn: ["", Validators.required],
      checkOut: ["", Validators.required],
      totalPrice: ["", Validators.required],
      status: ["", Validators.required],
      cardHolderName: ["", [Validators.required, ValidationService.cardholderNameValidator()]],
      cardNumber: ["", [Validators.required, ValidationService.creditCardNumberValidator()]],
      expireMonth: ["", [Validators.required]],
      expireYear: ["", [Validators.required]],
      cvc: ["", [Validators.required, ValidationService.creditCardCVVValidator()]]
    })
  }

  ngOnInit(): void {


    this.activatedRoot.params.subscribe(params =>
      this.reservationService.getById(params['id']).subscribe(response => {
        this.reservationModal = response
        this.formUpdate()
      })
    )



  }

  odemeyap() {
    if (this.paymentForm.valid) {
      this.payService.odeme(this.paymentForm.value).subscribe(response => {
        console.log(response);
        if (response.status === 'success') {
          // this.router.navigate(['/success']); // Başarılı ödeme sayfasına yönlendirme
          this.reservationModal.status = "PC"
          this.reservationService.update(this.reservationModal).subscribe(data => console.log(data))

        
          this.successEkrani = true;
        } else {
          // Başarısız ödeme durumu için işlemler
          console.error('Ödeme başarısız:', response);

          alert('Ödeme başarısız. Lütfen tekrar deneyin.');
        }
      }, error => {
        console.error('Ödeme işlemi sırasında hata oluştu:', error);
        alert('Ödeme işlemi sırasında hata oluştu. Lütfen tekrar deneyin.');
      });
    } else {
      console.error('Form geçerli değil:', this.paymentForm);
      alert('Lütfen gerekli tüm alanları doldurun.');
    }
  }


  formUpdate() {
    this.paymentForm.patchValue({
      id: this.reservationModal.id,
      userId: this.reservationModal.userId,
      roomId: this.reservationModal.roomId,
      hotelId: this.reservationModal.hotelId,
      checkIn: this.reservationModal.checkIn,
      checkOut: this.reservationModal.checkOut,
      totalPrice: this.reservationModal.totalPrice,
      status: this.reservationModal.status
    });
  }

}
