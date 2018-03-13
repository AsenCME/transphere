import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../data.service";
import { Transport } from "../models/transport";
import { Location } from "@angular/common";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  transport: Transport;
  monthString: String;

  constructor(private route: ActivatedRoute, private dataService: DataService, private location: Location) {}

  ngOnInit() {
    this.subToParams();
    this.monthToWord();
  }

  subToParams() {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getDataById(params.id).subscribe(trans => {
        this.transport = trans;
      });
    });
  }

  monthToWord() {
    this.monthString = this.dataService.monthNames[this.transport.date.month];
  }

  goBack() {
    this.location.back();
  }
}
