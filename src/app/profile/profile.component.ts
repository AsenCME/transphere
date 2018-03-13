import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Response } from "@angular/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  driver;
  editedUser;
  profilePic;
  offers;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.driver = this.dataService.currentUser;
    this.editedUser = this.driver;
    this.profilePic = "http://transphere.gimdesign.eu/images/" + this.driver.photo;
    this.dataService.getUserOffers(this.driver.driverid).subscribe(offers => {
      this.offers = offers;
    });
  }

  onSubmit() {
    this.dataService.currentUser = this.editedUser;
    this.driver = this.editedUser;
    this.dataService.editUser(this.editedUser);
  }
}
