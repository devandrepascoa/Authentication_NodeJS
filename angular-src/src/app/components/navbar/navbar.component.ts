import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private flashService: NgFlashMessageService,
    private router: Router) { }


  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.flashService.showFlashMessage({
      messages: ["You are logged out"],
      timeout: 3000,
      type: 'success'
    });
    return false;
  }

}
