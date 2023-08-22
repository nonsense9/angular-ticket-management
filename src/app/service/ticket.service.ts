import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

/**
 * This service acts as a mock back-end.
 * Please don't edit this file and don't use private methods and fields.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: null | string;
  assigneeId: null | number;
  completed: boolean;
};


function randomDelay() {
  return Math.random() * 4000;
}


@Injectable({providedIn: 'root'})
export class ApiService {
  // mock initial tickets
  private storedTickets$: BehaviorSubject<Ticket[] | null> = new BehaviorSubject<Ticket[]>([
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    }
  ]);

  // mock initial users
  private storedUsers$: BehaviorSubject<User[] | null> = new BehaviorSubject<User[]>([
    {id: null, name: "None"},
    {id: 111, name: "Victor"},
    {id: 222, name: "Ion"}
  ]);

  private lastTicketId = 1;

  private findTicketById(id: number) {
    let tickets = this.storedTickets$.getValue();
    const found = tickets.find(ticket => ticket.id === id);
    if (!found) {
      throw new Error(`Ticket (id=${id}) not found`);
    }

    return {...found};
  }

  private findUserById(id: number) {
    const users: User[] = this.storedUsers$.getValue()
    let foundUser = users.find((user) => user.id === id)
    if (!foundUser) {
      throw new Error(`User (id=${id}) not found`);
    }

    return {...foundUser};
  }

  public findUserByName(name: string) {
    const users: User[] = this.storedUsers$.getValue()
    let foundUser = users.find((user) => user.name === name)
    if (!foundUser) {
      throw new Error(`User (name=${name}) not found`);
    }

    return {...foundUser};
  }

  tickets() {
    return this.storedTickets$.asObservable();
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id))
  }

  completedTickets() {
    let tickets = this.storedTickets$.getValue();
    tickets = tickets.filter((ticket) => !!ticket.completed)
    return of(tickets)
  }

  uncompletedTickets() {
    let tickets = this.storedTickets$.getValue();
    tickets = tickets.filter((ticket) => !ticket.completed)
    return of(tickets)
  }

  newTicket(payload: {description: string, assigneeId: number}) {
    const newTicket: Ticket = {
      id: ++this.lastTicketId,
      description: payload.description,
      assigneeId: payload.assigneeId ?? null,
      completed: false
    };

    return of(newTicket).pipe(
      tap((ticket: Ticket) => this.storedTickets$.next([...this.storedTickets$.getValue(), ticket]))
    ).subscribe();
  }

  users() {
    return this.storedUsers$.asObservable();
  }

  user(id: number) {
    return of(this.findUserById(id))
  }

  newUser(name: string) {
    const newUser = {
      id: Date.now(),
      name
    }
    this.storedUsers$.next([...this.storedUsers$.getValue(), newUser])
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(ticketId);
    const user = this.findUserById(userId);

    if (!foundTicket || !user) {
      return throwError(new Error("ticket or user not found"));
    }

    return of(foundTicket).pipe(
      tap((ticket: Ticket) => {
        let tickets = this.storedTickets$.getValue();
        tickets = tickets.map(storedTicket => {
          if (storedTicket.id === ticket.id) {
            return {
              ...ticket,
              assigneeId: userId
            };
          }
          return storedTicket;
        });
        this.storedTickets$.next(tickets);
      })
    );
  }

  complete(ticketId: number) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    return of(foundTicket).pipe(
      tap((ticket: Ticket) => {
        let tickets = this.storedTickets$.getValue();
        tickets = tickets.map(storedTicket => {
          if (storedTicket.id === ticket.id) {
            return {
              ...ticket,
              completed: true
            };
          }
          return storedTicket;
        });
        this.storedTickets$.next(tickets);
      })
    );
  }

  remove(ticketId: number) {
    let tickets: Ticket[] = this.storedTickets$.getValue();
    tickets = tickets.filter(ticket => ticket.id !== ticketId);
    this.storedTickets$.next(tickets)
  }
}
