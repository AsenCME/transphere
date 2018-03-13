import { Component, OnInit, OnChanges, Input, ElementRef } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params, Router } from "@angular/router";
declare var $: any;

import { trigger, state, style, animate, transition, query, stagger } from "@angular/animations";
import { SearchQuery } from "../models/searchQuery";
import { Transport } from "../models/transport";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0, transform: "translateY(-10%)" }), { optional: true }),
        query(":leave", [stagger(50, [animate("0.5s", style({ opacity: 0, transform: "translate(10%)" }))])], {
          optional: true,
        }),
        query(
          ":enter",
          [style({ opacity: 0 }), stagger(100, [animate("0.5s", style({ opacity: 1, transform: "translateY(0%)" }))])],
          {
            optional: true,
          },
        ),
      ]),
    ]),
  ],
})
export class CalendarComponent implements OnInit {
  data = [];
  filteredData = [];
  query: SearchQuery;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
  ) {}

  ngOnInit() {
    this.getData();
    this.subToParams();
    this.subToQuery();
  }

  getData() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  subToParams() {
    this.route.params.subscribe((params: Params) => {
      if (params.id.slice(0, 3) === "all") {
        this.displayAll();
        return;
      }
      if (params.id == 1) {
        this.dataService.getData().subscribe(data => {
          let id = data[0].monthid;
          this.router.navigate([`/calendar/${id}`]);
        });
      }
      this.filterData(params.id);
    });
  }

  filterData(monthid) {
    this.dataService.getDataByMonthId(monthid).subscribe(data => {
      this.filteredData = data;
    });
  }

  subToQuery() {
    this.dataService.searchQueryChange.subscribe(query => {
      this.filterByQuery(query);
    });
  }

  displayAll() {
    this.dataService.getData().subscribe(data => (this.filteredData = data));
  }

  toWeekDay(month) {
    return this.dataService.monthNames[+month - 1];
  }

  filterByQuery(query: SearchQuery) {
    if (query.value.trim() === "") {
      this.filteredData = this.data;
      return;
    }
    switch (query.type) {
      case "price":
        this.filteredData = this.data.filter(x => {
          let currentPrice = Number(x.price);
          let valuePrice = Number(query.value);
          return currentPrice <= valuePrice;
        });
        break;
      case "city":
        this.filteredData = this.data.filter(x => {
          return (
            x.endcity.toLowerCase().includes(query.value.toLowerCase()) ||
            x.startcity.toLowerCase().includes(query.value.toLowerCase())
          );
        });
        break;
    }
  }
}
