import { Injectable } from "@angular/core";
import * as Globals from "../core/globals";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToolsService } from '../core/services/tools.service'

@Injectable({
  providedIn: "root",
})
export class SalasService {
  serverUrl: string;

  constructor(private http: HttpClient, private toolService: ToolsService) {
    this.serverUrl = Globals.SERVER;
  }

  List(): Observable<any> {
    return this.http.get(this.serverUrl + "sala"  + "/list");
  }

  create(objeTosend): Observable<any> {   
    let objSala = {
      nombre :  objeTosend.nombre,     
      formato :  {
        id :  objeTosend.formato,
      }
    }
    let body = objSala;
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let ruta = this.serverUrl   +  "sala/new" ;
    return this.http.post( ruta, body, { headers: headers });
  }

  update(objeTosend): Observable<any> {
    let body = { 
    };
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.serverUrl, body, { headers: headers });
  }

  delete(id): Observable<any> {
    let body = { };
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.serverUrl, body, { headers: headers });
  }
}
