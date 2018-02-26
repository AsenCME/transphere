import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterializeModule } from "angular2-materialize";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { BottomNavbarComponent } from "./bottom-navbar/bottom-navbar.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AppRoutingModule } from ".//app-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { DataService } from "./data.service";

@NgModule({
  declarations: [AppComponent, TopNavbarComponent, BottomNavbarComponent, CalendarComponent, ProfileComponent],
  imports: [BrowserModule, MaterializeModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
