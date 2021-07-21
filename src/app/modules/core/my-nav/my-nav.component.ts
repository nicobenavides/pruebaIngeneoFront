import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "my-nav",
  templateUrl: "./my-nav.component.html",
  styleUrls: ["./my-nav.component.scss"],
})
export class MyNavComponent {
  public MostrarRouter: boolean = true;
  public urlLogo: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.urlLogo = "../../../assets/logoIngeneo.png";
  }

  goToProfile() {
    this.mostrarRouter();
    this.router.navigate(["/dashboard/perfil"]);
  }

  logout() {
    localStorage.removeItem("USER");
    this.router.navigate(["home/inicio"]);
  }

  mostrarRouter() {
    this.MostrarRouter = true;
  }
}
