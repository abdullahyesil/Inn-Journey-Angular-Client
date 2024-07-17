import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(private authService:AuthService,
    private router:Router
  ){}

  login() {

    this.authService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/hotels']);
          // Burada başarılı giriş işlemi sonrası yapılacak işlemleri ekleyebilirsiniz
        },
        (error) => {
          console.error('Login failed:', error);
          // Hata durumunda kullanıcıya bildirim gösterebilirsiniz
        }
      );
  }
}
