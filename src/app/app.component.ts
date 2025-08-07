import { Component } from '@angular/core';
import {LoadingService} from "./service/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}


}
