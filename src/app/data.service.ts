import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { User } from "./models/user";
import { Transport } from "./models/transport";
import { SearchQuery } from "./models/searchQuery";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";

@Injectable()
export class DataService {
  monthNames: String[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  currentUser: User = new User();
  searchQueryChange: Subject<SearchQuery> = new Subject<SearchQuery>();

  transports: Array<Transport> = [
    {
      id: "1",
      monthId: "3-2018",
      date: { day: "2", weekDay: "tue", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "blagoevgrad", price: "45$", time: "3PM" },
    },
    {
      id: "2",
      monthId: "3-2018",
      date: { day: "3", weekDay: "wed", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "bansko", price: "30$", time: "5PM" },
    },
    {
      id: "3",
      monthId: "3-2018",
      date: { day: "4", weekDay: "thu", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "razlog", price: "20$", time: "1PM" },
    },
    {
      id: "4",
      monthId: "3-2018",
      date: { day: "12", weekDay: "sat", month: 3, year: 2018 },
      event: { startDest: "sofia", endDest: "shumen", price: "20$", time: "4AM" },
    },
    {
      id: "5",
      monthId: "4-2018",
      date: { day: "5", weekDay: "fri", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "sliven", price: "60$", time: "7AM" },
    },
    {
      id: "6",
      monthId: "4-2018",
      date: { day: "6", weekDay: "sat", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "burgas", price: "100$", time: "8AM" },
    },
    {
      id: "7",
      monthId: "4-2018",
      date: { day: "7", weekDay: "sun", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "8",
      monthId: "4-2018",
      date: { day: "15", weekDay: "sun", month: 4, year: 2018 },
      event: { startDest: "sofia", endDest: "plovdiv", price: "32$", time: "4PM" },
    },
    {
      id: "9",
      monthId: "5-2018",
      date: { day: "8", weekDay: "mon", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "10",
      monthId: "5-2018",
      date: { day: "9", weekDay: "tue", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "11",
      monthId: "5-2018",
      date: { day: "10", weekDay: "wed", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "montana", price: "70$", time: "1AM" },
    },
    {
      id: "12",
      monthId: "5-2018",
      date: { day: "11", weekDay: "thu", month: 5, year: 2018 },
      event: { startDest: "sofia", endDest: "banq", price: "20$", time: "3AM" },
    },
  ];

  constructor(private http: Http) {
    this.getData();
    this.getMonths();
  }

  getInfo(id): Observable<any> {
    if (id === null) {
      return this.http.get("http://transphere.gimdesign.eu/driver_query.php").map(res => res.json());
    }
    return this.http.get("http://transphere.gimdesign.eu/driver_query.php?id=" + id).map(res => res.json());
  }

  getData(): Observable<Transport[]> {
    return of(this.transports);
  }

  getDataById(id): Observable<Transport> {
    return of(this.transports.find(x => x.id == id));
  }

  getMonths() {
    let months = [];
    this.transports.forEach(item => {
      let monthId = `${item.date.month}-${item.date.year}`;
      let obj = { monthId: monthId, month: this.monthNames[item.date.month - 1], year: item.date.year };
      if (months.find(x => x.monthId === monthId) === undefined) {
        months.push(obj);
      }
    });
    return months;
  }
}
