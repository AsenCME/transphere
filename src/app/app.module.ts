import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterializeModule } from "angular2-materialize";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { BottomNavbarComponent } from "./bottom-navbar/bottom-navbar.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AppRoutingModule } from ".//app-routing.module";
import { DataService } from "./data.service";
import { InfoComponent } from "./info/info.component";
import { DetailComponent } from "./detail/detail.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    BottomNavbarComponent,
    CalendarComponent,
    InfoComponent,
    DetailComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, MaterializeModule, AppRoutingModule, BrowserAnimationsModule, HttpModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
