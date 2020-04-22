import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
    private validateService: ValidateService,
    private flashService: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    if (!this.validateService.validateAuthentication(user)) {
      this.flashService.showFlashMessage({
        messages: ["Fill all the fields"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashService.showFlashMessage({
          messages: ["You are now logged in!"],
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashService.showFlashMessage({
          messages: [data.msg],
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(["/login"]);
      }
    });
  }

}
