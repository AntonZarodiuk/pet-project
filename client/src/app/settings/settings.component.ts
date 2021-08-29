import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  oldPassword = '';
  newPassword = '';

  user = JSON.parse(localStorage.getItem('user') as string);
  login = this.user.login;
  passwordMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  userChangePasswordClick() {
    const user = {
      login: this.login,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    }

    this.authService.changePassword(user).subscribe((response: any) => {
      if (user.oldPassword && user.newPassword) {
        this.passwordMessage = response.msg;
        if (response.success) {
          setTimeout( () => {
            this.router.navigate(['client/dashboard']);
          }, 2000 )
        }
      } else {
        this.passwordMessage = `Please, complete all fields`;
      }
    })
  }

}
