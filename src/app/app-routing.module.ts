import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Pages/Components
import {TicketListComponent} from "./pages/ticket-list/ticket-list.component";
import {TicketDetailComponent} from "./pages/ticket-detail/ticket-detail.component";
import {HomeComponent} from "./pages/home/home.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {DictionaryComponent} from "./pages/dictionary/dictionary.component";

//Services
import {AuthGuard} from "./service/auth.service";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'dictionary', component: DictionaryComponent, canActivate: [AuthGuard]},
  {path: 'tickets', component: TicketListComponent, canActivate: [AuthGuard]},
  {path: 'tickets/:ticketId', component: TicketDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
