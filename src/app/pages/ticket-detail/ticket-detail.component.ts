import {Component, OnInit} from '@angular/core';
import {ApiService, Ticket} from "../../service/service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit{
  ticket: Ticket = {
    id: null,
    completed: null,
    assigneeId: null,
    description: null
  }
  constructor(private service: ApiService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    let routeParams = this.route.snapshot.paramMap;
    const ticketIdFromRoute = Number(routeParams.get('ticketId'));
    this.service.ticket(ticketIdFromRoute).subscribe((res) => {
      this.ticket = res;
    })
  }
}
