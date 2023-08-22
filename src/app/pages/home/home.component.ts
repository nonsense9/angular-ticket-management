import { Component } from '@angular/core';
import {AuthenticationService} from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public auth: AuthenticationService) {
  }

  login() {
    this.auth.loggedIn();
  }

  logout() {
    this.auth.logout();
  }
}
