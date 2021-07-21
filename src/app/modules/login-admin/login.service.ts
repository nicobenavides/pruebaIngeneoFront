import { Injectable } from '@angular/core';
import * as Globals from '../../modules/core/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUrl: string;
  SERVER_RECURSO_LOGIN_ADMIN = "";

  constructor(private http: HttpClient) { 
    this.serverUrl = Globals.SERVER;
  }

  loginWeb(objeTosend): Observable<any> {
    let body = objeTosend;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let ruta = this.serverUrl + "/usuario/login";
    console.log(ruta);
    return this.http.post( ruta  , body, { headers: headers });
    }

}
