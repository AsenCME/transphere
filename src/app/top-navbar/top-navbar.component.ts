import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  selectOptions = [];

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.selectOptions = this.dataService.getMonths();
    this.select(this.selectOptions[0].id);
  }

  select(id) {
    this.router.navigate([`/calendar/${id}`]);
  }
}
