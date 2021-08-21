import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  name: string = '';
  login: string = '';
  email: string = '';
  password: string = '';

  loginError: string = '';
  emailError: string = '';
  passError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { };
  
  userRegisterClick() {
    this.loginError = '';
    this.emailError = '';
    this.passError = '';

    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe((response: any) => {
      if (!response.success) {
        if (response.type === "EmailError") {
          this.emailError = response.msg;
        } else if (response.type === "LoginError") {
          this.loginError = response.msg;
        } else {
          this.passError = response.msg;
        }

      } else {
        this.router.navigate(['/authorization'])
      }
    })


    return true;
  }

}
