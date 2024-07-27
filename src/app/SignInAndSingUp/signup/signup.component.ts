import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public errorMessage:string =""
  public signUpForm : FormGroup
  constructor(
    private userService:UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router:Router,
  ) {
    
  this.signUpForm = this.fb.group({
    name: ['', [ValidationService.nameValidator()]],
    userName: ['', [ValidationService.usernameValidator()]],
    email: ['', [ValidationService.emailValidator()]],
    age: ['', [ValidationService.ageValidator()]],
    phone: ['', [ValidationService.phoneValidator()]],
    gender: [false],
    password: ['',[ValidationService.passwordValidator()]],
    confirmPassword: [''],

  })
  }


  submitRegister(){
    console.log(this.signUpForm.value)
    if(this.signUpForm.valid){
      
    console.log(this.signUpForm.value)
      this.userService.createUser(this.signUpForm.value).subscribe((resp)=> {
     console.log(resp)
     if(!!resp){
        this._snackBar.open( 'Başarıyla kayıt oldun','',{ duration:4000 });
        this.router.navigate(["login"]);}
      },
    (error) => {

      console.error('SignUp failed:', error);
      this.errorMessage = 'Kayıt olurken bir hata oluştu. Hata Mesajı:' + error.message;

      debugger;
      
    }
  );
  
    }
  }

}
