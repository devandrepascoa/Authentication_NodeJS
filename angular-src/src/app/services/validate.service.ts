import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == null || user.username == null
      || user.email == null || user.password == null) {
      return false;
    } else {
      if (user.name.length > 0 && user.username.length > 0 && user.email.length > 0 && user.password.length > 0)
        return true;
      else
        return false;
    }
  }

  validateAuthentication(user) {
    if (user.username == null || user.password == null) {
      return false;
    } else {
      if (user.username.length > 0 && user.password.length > 0)
        return true;
      else
        return false;
    }
  }

  validateEmail(email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
  }
}
