import { Injectable } from "@angular/core";
import * as Globals from "../core/globals";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToolsService } from '../core/services/tools.service'

@Injectable({
  providedIn: "root",
})
export class SucursalService {
  serverUrl: string;

  constructor(private http: HttpClient, private toolService: ToolsService) {
    this.serverUrl = Globals.SERVER;
  }

  List(objeTosend?): Observable<any> {
    return this.http.get(this.serverUrl + "sucursal"  + "/list");
  }

  ListCiudades(objeTosend?): Observable<any> {
    return this.http.get(this.serverUrl + "ciudad"  + "/list");
  }

  ListEmpleados(objeTosend?): Observable<any> {
    return this.http.get(this.serverUrl + "empleado"  + "/list");
  }
  
  create(objeTosend): Observable<any> {    
    console.log(objeTosend);

    let objSucursal = {
      nombre :  objeTosend.nombre,
      direccion :  objeTosend.direccion,
      administrador :  {
        id :  objeTosend.administrador,
      },
      ciudad :  {
        id :  objeTosend.ciudad,
      }
    }

    let body = objSucursal;
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let ruta = this.serverUrl   +  "sucursal/new" ;
    return this.http.post( ruta, body, { headers: headers });
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
