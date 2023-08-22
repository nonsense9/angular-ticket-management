//Angular
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

//3rd side packages
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";

//Components
import {AppRoutingModule} from './app-routing.module';
import {TicketListComponent} from './pages/ticket-list/ticket-list.component';
import {TicketDetailComponent} from './pages/ticket-detail/ticket-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {AppComponent} from './app.component';
import {StatusComponent} from './components/status/status.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AuthenticationService} from "./service/auth.service";
import {LoadingService} from "./service/loader.service";
import {LoadingInterceptor} from "./interceptors";
import {DictionaryComponent} from './pages/dictionary/dictionary.component';
import {DictionaryService} from "./service/dictionary.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailComponent,
    StatusComponent,
    HomeComponent,
    CalendarComponent,
    HeaderComponent,
    FooterComponent,
    DictionaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [AuthenticationService, DictionaryService, LoadingService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
