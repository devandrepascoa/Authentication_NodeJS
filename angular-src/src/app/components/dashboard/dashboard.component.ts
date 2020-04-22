import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,
    private validateService: ValidateService,
    private flashService: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
  }

}
