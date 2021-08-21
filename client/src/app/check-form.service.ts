import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { };

  checkName(name: String) {
    if(name) {
      return true;
    }
    return false;
  };

  checkLogin(login: String) {
    if(login) {
      return true;
    }
    return false;
  };

  checkEmail(email: String) {
    if(email) {
      return true;
    }
    return false;
  };

  checkPassword(password: String) {
    if(password) {
      return true;
    }
    return false;
  };

}
