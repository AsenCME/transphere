import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { InfoComponent } from "./info/info.component";
import { DetailComponent } from "./detail/detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { AddOfferComponent } from "./add-offer/add-offer.component";
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: "calendar/:id", component: CalendarComponent },
  { path: "detail/:id", component: DetailComponent },
  { path: "info", component: InfoComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: "add", component: AddOfferComponent, canActivate: [AuthGuardService] },
  // Only if not logged in
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/calendar/1", pathMatch: "full" },
  { path: "**", redirectTo: "/calendar/1", pathMatch: "full" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
