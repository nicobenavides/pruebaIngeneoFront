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
    return this.http.get(this.serverUrl + "salas"  + "/list");
  }

  create(objeTosend): Observable<any> {
    let body = {
      query: `
      mutation {
        createComercio (comercio: {
            id: "${objeTosend.id}"
            name: "${objeTosend.name}",
            location: "${objeTosend.location}",
            description: "${objeTosend.description}",
            lat: "${objeTosend.lat}",
            lng: "${objeTosend.lng}",
        }) {
           name
        }
      }
      `,
    };
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.serverUrl, body, { headers: headers });
  }

  update(objeTosend): Observable<any> {
    let body = {
      query: `
      mutation {
        updateComercio (comercio: {
            _id: "${objeTosend._id}",
            id: "${objeTosend.id}",
            name: "${objeTosend.name}",
            location: "${objeTosend.location}",
            description: "${objeTosend.description}",
            lat: "${objeTosend.lat}",
            lng: "${objeTosend.lng}",
        }) {
           name
        }
      }
      `,
    };
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.serverUrl, body, { headers: headers });
  }

  delete(id): Observable<any> {
    let body = {
      query: `
        mutation {
          deleteComercio(comercio: {_id: "${id}"}) {
             description
          }
        }
        `,
    };
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.serverUrl, body, { headers: headers });
  }
}
