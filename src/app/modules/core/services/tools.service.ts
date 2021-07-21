import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoadingComponent } from '../loading/loading.component';
import * as Globals from '../globals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  serverUrl: string;
  webRoot: string;

  public dialogRef: any;
  public msgDialogRef: any;
  public isReloadLogout: boolean = false;
  private messageSource = new BehaviorSubject<any>("Mensaje defecto");
  currentMessage = this.messageSource.asObservable();

  private dataFiltroReporte = new BehaviorSubject<any>("");
  currentMessageFiltroReporte = this.dataFiltroReporte.asObservable();

  constructor(private dialog: MatDialog, private httpClient: HttpClient, private router: Router) {
    this.serverUrl = Globals.SERVER;
    this.webRoot = this.serverUrl + Globals.SERVER_FOLDER_WEBROOT;
  }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  addDataFiltroReporte(message: any) {
    this.dataFiltroReporte.next(message);
  }
 
  getWebRoot(): String {
    return this.webRoot;
  };

  setReloadLogout() {
    this.isReloadLogout = true;
  }

  getReloadLogout(): boolean {
    return this.isReloadLogout;
  }   
  
  /**
   * Se crea este metodo con el objetivo de tomar cualquier FORMULARIO FORM
   * y poder detectar el nombre del attributo que esta invalido
  */
  public getInvalidControlsInForm(lForm): string[] {
    const invalid = [];
    const controls = lForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  public validateEmail(valor): boolean {
    let regexp: RegExp;
    regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regexp.test(valor)) {
      return true;
    }
    return false;
  }
  public getParams(filtro, ordenamiento): string {
    let params = ''

    if (filtro.length > 1) {
      params = "(" + filtro;
    }
    if (ordenamiento.length > 1) {
      if (params.length > 1) {
        params += ",";
      } else {
        params += "(";
      }
      params += ordenamiento;
    }

    if (params.length > 1) {
      params += ")";
    }

    return params

  };

}
