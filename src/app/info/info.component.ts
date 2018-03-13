import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"],
})
export class InfoComponent implements OnInit {
  isDriver;
  constructor(private dataService: DataService) {
    this.isDriver = this.dataService.currentUser.isDriver;
    this.dataService.currentUserChange.subscribe(user => {
      if (user.isDriver === true) {
        this.isDriver = true;
      } else {
        this.isDriver = false;
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.dataService.logOut();
  }
}
