import { Component, OnInit } from "@angular/core";
import { ServicesService } from "./modules/core/services/services.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [],
})
export class AppComponent implements OnInit {
  title = "Ingeneo WebApp";
  data: any = {};

  constructor(private service: ServicesService, private router: Router) {}
  ngOnInit() {}

  clicButton() {
    console.log("hola navigating...");
    this.router.navigate(["/login"]);
  }
}
