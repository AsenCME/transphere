import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { trigger, state, style, animate, transition, query, stagger } from "@angular/animations";

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
  data: Array<any>;
  filteredData: Array<any> = [];

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getData();
    this.subToParams();
  }

  getData() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  subToParams() {
    this.route.params.subscribe((params: Params) => {
      if (params.id == 1) {
        let id = this.dataService.getMonths()[0].id;
        this.router.navigate([`/calendar/${id}`]);
      }
      this.filterData(params.id);
    });
  }

  filterData(id) {
    this.filteredData = [];
    setTimeout(() => {
      this.filteredData = this.data.filter(x => x.id === id);
    }, 600);
  }
}
