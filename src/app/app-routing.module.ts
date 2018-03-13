import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { InfoComponent } from "./info/info.component";
import { DetailComponent } from "./detail/detail.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "calendar/:id", component: CalendarComponent },
  { path: "detail/:id", component: DetailComponent },
  // { path: "info", component: InfoComponent },
  { path: "info", component: ProfileComponent },
  // { path: "", redirectTo: "/calendar/1", pathMatch: "full" },
  // { path: "**", redirectTo: "/calendar/1", pathMatch: "full" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
