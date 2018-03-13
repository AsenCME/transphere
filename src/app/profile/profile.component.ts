import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import "rxjs/add/operator/map";
import { Response } from "@angular/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  info;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getInfo();
  }
  getInfo(id = null) {
    this.dataService.getInfo(id).subscribe(info => {
      console.log(info);
    });
  }
}
