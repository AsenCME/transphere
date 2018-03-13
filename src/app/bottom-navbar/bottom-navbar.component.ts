import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router, NavigationEnd } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-bottom-navbar",
  templateUrl: "./bottom-navbar.component.html",
  styleUrls: ["./bottom-navbar.component.css"],
})
export class BottomNavbarComponent implements OnInit {
  activeTabId: Number = 0;
  isDriver;

  constructor(private dataService: DataService, private router: Router) {
    this.isDriver = this.dataService.currentUser.isDriver;
  }

  ngOnInit() {
    this.updateActiveTab();
    this.subToDriver();
    this.subToParams();
  }

  subToParams() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url.includes("/calendar")) {
          this.removeSelectedTab();
          let exact = route.url.split("/").pop();
          if (exact === "all") this.changeTab(1);
          else this.changeTab(0);
        } else if (route.url === "/profile") {
          this.removeSelectedTab();
          this.changeTab(3);
        } else if (route.url === "/info") {
          this.removeSelectedTab();
          this.changeTab(2);
        } else if (route.url === "/login" || route.url === "/add" || route.url.includes("/detail")) {
          this.removeSelectedTab();
        }
      }
    });
  }

  updateActiveTab() {
    $(`#tab-${this.activeTabId}`).addClass("active");
  }

  removeSelectedTab() {
    $(`.tab`).removeClass("active");
  }

  changeTab(number: Number) {
    this.removeSelectedTab();
    this.activeTabId = number;
    this.updateActiveTab();
  }

  subToDriver() {
    this.dataService.currentUserChange.subscribe(user => (this.isDriver = user.isDriver));
  }
}
