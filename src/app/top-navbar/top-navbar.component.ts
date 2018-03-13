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
  isOnProfile: Boolean = false;
  isOnLogin: Boolean = false;
  isOnInfo: Boolean = false;
  isOnAdd: Boolean = false;
  isDriver;
  defaultValue;
  searchOptions = [{ name: "by city", value: "city" }, { name: "up to price", value: "price" }];
  selectOptions = [];

  constructor(public dataService: DataService, private router: Router) {
    this.isDriver = this.dataService.currentUser.isDriver;
    this.selectOptions = this.dataService.allMonths;
    this.dataService.allMonthsChange.subscribe(opts => {
      this.selectOptions = opts;
      this.defaultValue = opts[0];
    });
  }

  ngOnInit() {
    this.subToParams();
    this.subToDriver();
  }

  select(id) {
    this.router.navigate([`/calendar/${id}`]);
  }

  subToDriver() {
    this.dataService.currentUserChange.subscribe(user => {
      this.isDriver = user.isDriver;
    });
  }

  subToParams() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url.includes("-")) {
          let monthid = route.url.split("/").pop();
          this.defaultValue = monthid;
        }

        if (route.url.includes("/calendar/all")) {
          this.isSearching = true;
          this.isOnDetail = false;
          this.isOnProfile = false;
          this.isOnLogin = false;
          this.isOnInfo = false;
          this.isOnAdd = false;
        } else if (route.url.includes("/detail")) {
          this.isOnDetail = true;
          this.isSearching = false;
          this.isOnProfile = false;
          this.isOnLogin = false;
          this.isOnInfo = false;
          this.isOnAdd = false;
        } else if (route.url.includes("/profile")) {
          this.isSearching = false;
          this.isOnDetail = false;
          this.isOnProfile = true;
          this.isOnLogin = false;
          this.isOnInfo = false;
          this.isOnAdd = false;
        } else if (route.url.includes("/login")) {
          this.isSearching = false;
          this.isOnDetail = false;
          this.isOnProfile = false;
          this.isOnLogin = true;
          this.isOnInfo = false;
          this.isOnAdd = false;
        } else if (route.url.includes("/info")) {
          this.isSearching = false;
          this.isOnDetail = false;
          this.isOnProfile = false;
          this.isOnLogin = false;
          this.isOnInfo = true;
          this.isOnAdd = false;
        } else if (route.url === "/add") {
          this.isSearching = false;
          this.isOnDetail = false;
          this.isOnProfile = false;
          this.isOnLogin = false;
          this.isOnInfo = false;
          this.isOnAdd = true;
        } else {
          this.isSearching = false;
          this.isOnDetail = false;
          this.isOnProfile = false;
          this.isOnLogin = false;
          this.isOnInfo = false;
          this.isOnAdd = false;
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
