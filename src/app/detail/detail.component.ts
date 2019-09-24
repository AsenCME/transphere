import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../data.service";
import { Transport } from "../models/transport";
import { Location } from "@angular/common";
import { toast } from "angular2-materialize";
declare var $: any;

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  transport;
  editTransport;
  offeringDriver;
  canEdit;
  monthString: String;

  constructor(private route: ActivatedRoute, private dataService: DataService, private location: Location) {}

  ngOnInit() {
    this.editTransport = this.transport;
    this.subToParams();
    this.subToTrans();
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

  subToParams() {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getDataById(params.id).subscribe(data => {
        console.log(data[0]);
        this.dataService.singleTransChange.next(data[0]);
        this.getDriver(this.transport.driverid);
      });
    });
  }

  subToTrans() {
    this.dataService.singleTransChange.subscribe(data => {
      this.transport = data;
      this.editTransport = data;
      let monthNum = +data.month;
      this.monthString = this.dataService.monthNames[monthNum - 1];
    });
  }

  goBack() {
    this.location.back();
  }

  getDriver(driverid) {
    this.dataService.getDriver(driverid).subscribe(driver => {
      this.offeringDriver = driver[0];
      if (this.dataService.currentUser.driverid === this.offeringDriver.driverid) {
        this.canEdit = true;
      } else {
        this.canEdit = false;
      }
    });
  }

  saveChanges() {
    let arrivet = $("#arrivet").val();
    let trDate = $("#date").val();
    let luggage = $("#luggage select").val();
    this.editTransport.arrivet = arrivet;
    this.editTransport.date = trDate;
    this.editTransport.luggage = luggage;
    this.dataService.editOffer(this.editTransport);
  }

  deleteOffer() {
    this.dataService.deleteOffer(this.transport.id);
  }

  openGMaps() {
    let baseUrl = "https://www.google.com/maps/dir/?api=1";
    let origin = (<String>this.transport.startpt)
      .replace("-", " ")
      .replace(/\s/g, "+")
      .replace(/[+]{2}/g, "+")
      .split("-")
      .shift();
    let destination = (<String>this.transport.endpt)
      .replace("-", " ")
      .replace(/\s/g, "+")
      .replace(/[+]{2,}/g, "+")
      .split("-")
      .shift();
    let finalUrl = `${baseUrl}&origin=${origin}&destination=${destination}`;
    window.location.href = finalUrl;
  }
}
