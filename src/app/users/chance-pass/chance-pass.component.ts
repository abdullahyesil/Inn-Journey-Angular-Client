import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chance-pass',
  templateUrl: './chance-pass.component.html',
  styleUrl: './chance-pass.component.scss'
})
export class ChangePassComponent implements OnInit{
  
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
      this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  submitForm(){

  }

}


