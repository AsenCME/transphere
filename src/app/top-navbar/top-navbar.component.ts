import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, NavigationEnd } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.css"],
})
export class TopNavbarComponent implements OnInit {
  isSearching: Boolean = false;
  isOnDetail: Boolean = false;
  isDriver: Boolean = false;
  searchOptions = [{ name: "by city", value: "city" }, { name: "up to price", value: "price" }];
  selectOptions = [];

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.selectOptions = this.dataService.getMonths();
    this.select(this.selectOptions[0].monthId);
    this.subToParams();
    this.getIsDriver();
  }

  select(id) {
    this.router.navigate([`/calendar/${id}`]);
  }

  getIsDriver() {
    this.isDriver = this.dataService.currentUser.isDriver;
  }

  subToParams() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url.includes("/calendar/all")) {
          this.isSearching = true;
          this.isOnDetail = false;
        } else if (route.url.includes("/detail")) {
          this.isOnDetail = true;
          this.isSearching = false;
        } else {
          this.isSearching = false;
          this.isOnDetail = false;
        }
      }
    });
  }

  onKeyUp(searchParams) {
    let type = $("#searchType").val();
    let query = { value: searchParams, type: type };
    this.dataService.searchQueryChange.next(query);
  }
}
