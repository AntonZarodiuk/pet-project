import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  loginMessage: String;
  emailMessage: String;
  passwordMessage: String;


  constructor(
    private checkForm: CheckFormService,
    private router: Router,
    private authService: AuthService
  ) {
    this.name = '';
    this.login = '';
    this.email = '';
    this.password = '';

    this.loginMessage = '';
    this.emailMessage = '';
    this.passwordMessage = '';
  };

  ngOnInit(): void {
  };

  userRegisterClick() {
    this.loginMessage = '';
    this.emailMessage = '';
    this.passwordMessage = '';

    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    if (!this.checkForm.checkLogin(user.login)) {
      this.loginMessage = '<div class="aler alert-secondary">Login required</div>';
      return false;
    } else if (!this.checkForm.checkEmail(user.email)) {
      this.emailMessage = '<div class="aler alert-secondary">Email required</div>';
      return false;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.passwordMessage = '<div class="aler alert-secondary">Password required</div>';
      return false;
    } else {
      this.authService.registerUser(user).subscribe( (response: any) => {
        if (!response.success) {
          if (response.type === "EmailError") {
            this.emailMessage = `<div class="aler alert-secondary">${response.msg}</div>`;
          } else if (response.type === "LoginError") {
            this.loginMessage = `<div class="aler alert-secondary">${response.msg}</div>`;
          } else {
            this.passwordMessage = `<div class="aler alert-secondary">${response.msg}</div>`;
          }
          
        } else {
          this.router.navigate(['/authorization'])
        }
      });
    }

    return true;
  };

}
