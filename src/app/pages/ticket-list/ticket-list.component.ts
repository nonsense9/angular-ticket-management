import {Component, OnInit} from '@angular/core';
import {ApiService, Ticket, User} from "../../service/ticket.service";
import {map, Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {TicketStatus} from "../../models/ticket-status.enum";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets$: Observable<Ticket[] | null> = null;
  users$: Observable<User[] | null> = null;
  ticketStatus = TicketStatus;

  profileForm = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(6), Validators.pattern((/^[A-Za-z]+$/))]],
    newUser: [''],
    user: this.fb.group({
      id: [''],
      name: ['', Validators.required]
    })
  });

  constructor(private service: ApiService, private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.getTickets();
    this.getUsers();
  }

  private getTickets() {
    this.tickets$ = this.service.tickets();
  }

  private getUsers() {
    this.users$ = this.service.users();
  }

  public showValidationErrorMessage(formControlName: string) {
    return this.profileForm.get(formControlName).touched && !this.profileForm.get(formControlName).value ||
      this.profileForm.get(formControlName).touched && !this.profileForm.get(formControlName).valid
  }

  public handleAddTicket(description: string, name: string) {
    if (!description) return;
    if (name && description) {
      let foundUserId = this.service.findUserByName(name).id ?? null
      if (foundUserId && description) {
        this.service.newTicket({description, assigneeId: foundUserId})
      } else if (!foundUserId && description) {
        this.service.newTicket({description, assigneeId: null})
      }
    }
  }

  public complete(id: number) {
    this.service.complete(id).subscribe()
  }

  public remove(id: number) {
    this.service.remove(id)
  }

  public addUser() {
    this.service.newUser(this.profileForm.get('newUser').value);
    this.profileForm.get('newUser').reset();
  }


  public call() {
    this.http.get('http://localhost:3000').subscribe((res) => {
      console.log('test interceptor', res)
    })
  }

  public filterByStatus(status: string) {
    switch (status) {
      case 'completed':
       this.tickets$ = this.service.completedTickets();
        break;
      case 'uncompleted':
        this.tickets$ = this.service.uncompletedTickets();
        break;
      case 'all':
        this.tickets$ = this.service.tickets();
        break;
      default:
        this.tickets$ = this.service.tickets();
        break;
    }

  }

}
