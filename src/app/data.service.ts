import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { User } from "./models/user";
import { Transport } from "./models/transport";

@Injectable()
export class DataService {
  currentUser: User;

  transports: Array<Transport> = [
    {
      id: "3-2018",
      date: { day: "2", weekDay: "tue", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "blagoevgrad", price: "45$", time: "3PM" },
    },
    {
      id: "3-2018",
      date: { day: "3", weekDay: "wed", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "bansko", price: "30$", time: "5PM" },
    },
    {
      id: "3-2018",
      date: { day: "4", weekDay: "thu", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "razlog", price: "20$", time: "1PM" },
    },
    {
      id: "3-2018",
      date: { day: "12", weekDay: "sat", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "shumen", price: "20$", time: "4AM" },
    },
    {
      id: "4-2018",
      date: { day: "5", weekDay: "fri", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "sliven", price: "60$", time: "7AM" },
    },
    {
      id: "4-2018",
      date: { day: "6", weekDay: "sat", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "burgas", price: "100$", time: "8AM" },
    },
    {
      id: "4-2018",
      date: { day: "7", weekDay: "sun", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "4-2018",
      date: { day: "15", weekDay: "sun", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "plovdiv", price: "32$", time: "4PM" },
    },
    {
      id: "5-2018",
      date: { day: "8", weekDay: "mon", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "5-2018",
      date: { day: "9", weekDay: "tue", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "5-2018",
      date: { day: "10", weekDay: "wed", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "5-2018",
      date: { day: "11", weekDay: "thu", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "banq", price: "20$", time: "3AM" },
    },
  ];

  constructor() {
    this.getData();
    this.getMonths();
  }

  getData(): Observable<any> {
    return of(this.transports);
  }

  getMonths() {
    let months = [];
    let toChooseFrom = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.transports.forEach(item => {
      let id = `${item.date.month}-${item.date.year}`;
      let obj = { id: id, month: toChooseFrom[item.date.month - 1], year: item.date.year };
      if (months.find(x => x.id === id) === undefined) {
        months.push(obj);
      }
    });
    return months;
  }
}
