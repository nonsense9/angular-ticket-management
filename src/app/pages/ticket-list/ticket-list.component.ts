import {Component, OnInit} from '@angular/core';
import {ApiService, Ticket} from "../../service/service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  tickets$: Ticket[] = []

  constructor(private service: ApiService) {
  }

  ngOnInit() {
    this.service.tickets().subscribe((res) => {
      this.tickets$ = res;
      console.log(this.tickets$)
    })
  }


}
