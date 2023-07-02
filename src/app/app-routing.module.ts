import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketListComponent} from "./pages/ticket-list/ticket-list.component";
import {TicketDetailComponent} from "./pages/ticket-detail/ticket-detail.component";

const routes: Routes = [
  { path: '',   redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/:ticketId', component: TicketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
