import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { DataService } from "./data.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}

  canActivate(): boolean {
    if (!this.dataService.currentUser.isDriver) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
