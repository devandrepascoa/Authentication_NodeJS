import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private authService: AuthService,
    private validateService: ValidateService,
    private flashService: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      this.flashService.showFlashMessage({
        messages: ["Fill all the fields"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashService.showFlashMessage({
        messages: ["Email is not valid"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data : any) => {
      if (data.success) {
        this.router.navigate(["/login"]);
        this.flashService.showFlashMessage({
          messages: ["You are now registered and can log in"],
          timeout: 3000,
          type: 'success'
        });
      } else {
        this.flashService.showFlashMessage({
          messages: [data.msg],
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(["/register"]);
      }
    });

  }

}
