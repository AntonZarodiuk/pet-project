import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  login: String;
  password: String;

  loginMessage: String;
  passwordMessage: String;


  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.login = '';
    this.password = '';

    this.loginMessage = '';
    this.passwordMessage = '';
  };

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    }

    this.authService.authUser(user).subscribe((response: any) => {
      if (!response.success) {
        if (user.password && user.login) {
          this.passwordMessage = response.msg;
        } else {
          this.passwordMessage = `Please, complete all fields`;
        }
      } else {
        this.authService.storeUser(response.token, response.user);
        this.router.navigate(['client/dashboard']);
      }
    })
  }

}
