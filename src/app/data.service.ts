import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { User } from "./models/user";
import { Transport } from "./models/transport";
import { SearchQuery } from "./models/searchQuery";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import { catchError, tap } from "rxjs/operators";
import { toast } from "angular2-materialize";

@Injectable()
export class DataService {
  monthNames: String[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  currentUser: User = new User();
  allMonths;
  allMonthsChange = new Subject<String[]>();
  currentUserChange = new Subject<User>();
  isDriverChange: Subject<Boolean> = new Subject<Boolean>();
  singleTransChange: Subject<Transport> = new Subject<Transport>();
  searchQueryChange: Subject<SearchQuery> = new Subject<SearchQuery>();

  serverName: String = "http://transphere.gimdesign.eu/";

  transports: Array<Transport>;

  constructor(private http: Http, private router: Router) {
    this.getUser();
    this.getMonths();
    this.getData().subscribe(data => (this.transports = data));
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user === null) {
      this.currentUser = new User();
      this.currentUser.isDriver = false;
      this.currentUser.sessionToken = "";
    } else {
      if (this.isExpired(user.sessionToken)) {
        localStorage.removeItem("currentUser");
        this.currentUser = new User();
        this.currentUser.isDriver = false;
        this.currentUser.sessionToken = "";
      } else {
        this.isDriverChange.next(true);
        this.currentUser = user;
        this.currentUser.isDriver = true;
        this.currentUser.sessionToken = user.sessionToken;
      }
    }
    this.currentUserChange.next(this.currentUser);
    // console.log(this.currentUser);
  }

  isExpired(token) {
    let expirationDate = new Date(token + 30 * 24 * 60 * 60 * 1000);
    return token >= expirationDate;
  }

  getData(): Observable<Transport[]> {
    return this.http.get(this.serverName + "offers_query.php").map(res => res.json());
  }

  getDataByMonthId(monthid): Observable<Transport[]> {
    return this.http.get(this.serverName + "offers_query.php?monthid=" + monthid).map(res => res.json());
  }

  getDataById(id) {
    return this.http.get(this.serverName + "offers_query.php?id=" + id).map(res => res.json());
  }

  getDriver(id) {
    return this.http.get(this.serverName + "driver_query.php?id=" + id).map(res => res.json());
  }

  loginUser(email, pass) {
    this.http
      .get(this.serverName + `login.php?email=${email}&pass=${pass}`)
      .map(res => {
        if ((<any>res)._body[0] === "-") return (<any>res)._body;
        return res.json();
      })
      .subscribe(user => {
        if (user[0] === "-") {
          toast("Incorrect credentials", 2000);
        } else {
          this.currentUser = user[0];
          user[0].sessionToken = new Date().getTime();
          localStorage.setItem("currentUser", JSON.stringify(user[0]));
          this.getUser();
          this.router.navigate([`/profile`]);
          toast("Successfully logged in!", 2000);
        }
      });
  }

  getUserOffers(id) {
    return this.http.get(this.serverName + "offers_query.php?driverid=" + id).map(res => res.json());
  }

  getMonths() {
    let months = [];
    this.getData().subscribe(function(data) {
      data.forEach(function(item) {
        let monthid = item.monthid;
        if (!months.includes(monthid)) months.push(monthid);
      });
    });
    this.allMonths = months;
    this.allMonthsChange.next(months);
  }

  editUser(user) {
    return this.http.post(this.serverName + "editProfile.php", JSON.stringify(user)).subscribe(res => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.getUser();
      toast("Successfully edited profile!", 2000);
    });
  }

  addOffer(offer) {
    return this.http.post(this.serverName + "addOffer.php", JSON.stringify(offer)).subscribe(res => {
      this.router.navigate(["/calendar/1"]);
      this.getMonths();
      toast("Successfully added offer!", 2000);
    });
  }

  editOffer(offer) {
    return this.http
      .post(this.serverName + "editOffer.php", JSON.stringify(offer))
      .map(res => res.json())
      .subscribe(res => {
        this.singleTransChange.next(res[0]);
      });
  }

  deleteOffer(id) {
    return this.http.get(this.serverName + "deleteOffer.php?id=" + id).subscribe(res => {
      this.router.navigate(["/calendar/1"]);
      toast("Successfully deleted offer!", 2000);
    });
  }

  logOut() {
    localStorage.removeItem("currentUser");
    this.getUser();
    toast("Successfully logged out!", 2000);
  }
}
