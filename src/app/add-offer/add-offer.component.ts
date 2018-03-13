import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Location } from "@angular/common";
import { Transport } from "../models/transport";
declare var $: any;

@Component({
  selector: "app-add-offer",
  templateUrl: "./add-offer.component.html",
  styleUrls: ["./add-offer.component.css"],
})
export class AddOfferComponent implements OnInit {
  constructor(private dataService: DataService, private location: Location) {
    this.subToDriver();
  }

  newOffer = new Transport();
  driver;

  subToDriver() {
    this.dataService.currentUserChange.subscribe(user => (this.driver = user));
  }

  ngOnInit() {
    this.initScript();
    this.driver = this.dataService.currentUser;
  }

  initScript() {
    $(".datepicker").pickadate({
      selectMonths: true,
      selectYears: 15,
      today: "Today",
      clear: "Clear",
      close: "Ok",
      closeOnSelect: false,
    });

    $(".timepicker").pickatime({
      default: "now",
      fromnow: 0,
      twelvehour: false,
      donetext: "OK",
      cleartext: "Clear",
      canceltext: "Cancel",
      autoclose: false,
      ampmclickable: true,
      aftershow: function() {},
    });
  }

  onSubmit() {
    let arrivet = $("#arrivet").val();
    let trDate = $("#date").val();
    let luggage = $("#luggage select").val();
    this.newOffer.arrivet = arrivet;
    this.newOffer.date = trDate;
    this.newOffer.luggage = luggage.toLowerCase();
    this.newOffer.driverid = this.driver.driverid;
    this.dataService.addOffer(this.newOffer);
    this.dataService.getMonths();
  }

  goBack() {
    this.location.back();
  }
}
