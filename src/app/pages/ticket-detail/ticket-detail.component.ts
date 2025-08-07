import {Component, OnInit} from '@angular/core';
import {ApiService, Ticket} from "../../service/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket = {
    id: null,
    completed: null,
    assigneeId: null,
    description: null
  }
  ticketIdFromRoute: string = ''

  constructor(private service: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getRouteParams();
    this.getIdFromStorageAndGetTicket();
  }

  private getRouteParams() {
    let routeParams = this.route.snapshot.paramMap;
    this.ticketIdFromRoute = routeParams.get('ticketId');
  }

  private getIdFromStorageAndGetTicket() {
    localStorage.setItem('ticketId', this.ticketIdFromRoute);
    const storedTicketId = localStorage.getItem('ticketId')
    this.getTicket(Number(storedTicketId) ?? Number(this.ticketIdFromRoute))
  }

  private getTicket(id: number) {
    this.service.ticket(id ?? Number(this.ticketIdFromRoute)).subscribe((res) => {
      this.ticket = res;
    })
  }

  public complete(id: number) {
    this.service.complete(id).subscribe((res) => {
      this.getTicket(res.id)
    })
  }

  public remove(id: number) {
    this.service.remove(id);
    this.router.navigate(['tickets'])
  }
}
