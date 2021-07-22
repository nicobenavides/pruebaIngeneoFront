import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('entro canActivate');
    return true;
    if (true !== null ){
      console.log("logueado OK");
      return true;
    }else{
      console.log("no LOGUEADO");
      return true; //Temporal. HAVERJAN...
      this.router.navigate(['/login-admin'], {
        queryParams: {
          return: state.url
        }
      });
    }
return false;
  }
}
