import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-bottom-navbar",
  templateUrl: "./bottom-navbar.component.html",
  styleUrls: ["./bottom-navbar.component.css"],
})
export class BottomNavbarComponent implements OnInit {
  activeTabId: Number = 0;
  isDriver: Boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.updateActiveTab();
    this.getIsDriver();
  }

  updateActiveTab() {
    $(`#tab-${this.activeTabId}`).toggleClass("active");
  }

  changeTab(number: Number) {
    this.updateActiveTab();
    this.activeTabId = number;
    this.updateActiveTab();
  }

  getIsDriver() {
    this.isDriver = this.dataService.currentUser.isDriver;
  }
}
