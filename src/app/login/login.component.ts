import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}
  submitForm() {
    let email = $("#email").val();
    let pass = $("#password").val();
    this.dataService.loginUser(email, pass);
  }
}
