import { Component, OnInit } from "@angular/core";
import { SucursalService } from "./sucursal.service";
import { FormControl, FormGroup, Validators, NgModel } from "@angular/forms";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ToolsService } from "../core/services/tools.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sucursal",
  templateUrl: "./sucursal.component.html",
  styleUrls: ["./sucursal.component.scss"],
})
export class SucursalComponent implements OnInit {
  public userForm: FormGroup;
  listado: any = [];
  listadoCiudades: any = [];
  listadoEmpleados: any = [];

  public lShowBtnActualizar: Boolean = true;
  public lShowBtnAdicionar: Boolean = true;
  public lShowBtnEliminar: Boolean = true;
  public IsWait: Boolean = false;
  public dialogRef: any;
  public lShowPanelDatos: Boolean = false;
  public lShowPanelListado: Boolean = true;

  /*
   * Variables de Etiquetas para CRUDS
   */
  public etiquetaNombreModulo = "Sucursales";
  public etiquetaListado = "Listado de Sucursales";

  /*END ETIQUETAS CRUDS*/

  actualItemUrl: any;
  urlTemporal: any;

  selectedFiles: FileList;
  selectedFile: File;


  public usuarioEliminar: any;

  constructor(
    private lService: SucursalService,
    private toolService: ToolsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadListado();

    this.userForm = new FormGroup({
      id: new FormControl("", [Validators.maxLength(50)]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      administrador: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      direccion: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      ciudad: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    });
  }

  loadListado(obj?) {
    this.IsWait = true;
    this.lService.List(obj).subscribe((data) => {
      console.log("Data  from BACKEND");
      console.log(data);
      this.listado = data;
      this.IsWait = false;
    });
    this.ListCiudades();
    this.ListEmpleados();
  }

  ListCiudades(){
    this.lService.ListCiudades().subscribe((data) => {
      console.log("Data  from BACKEND");
      console.log(data);
      this.listadoCiudades = data;
      this.IsWait = false;
    });
  }

    ListEmpleados(){
    this.lService.ListEmpleados().subscribe((data) => {
      console.log("Data  from BACKEND");
      console.log(data);
      this.listadoEmpleados = data;
      this.IsWait = false;
    });
  }


  verDetalle(dataInput: any) {
    this.lShowPanelListado = false;
    this.lShowPanelDatos = true;
    this.lShowBtnActualizar = true;
    this.lShowBtnEliminar = true;
    this.lShowBtnAdicionar = false;
    this.userForm.patchValue(dataInput);
  }

  adicionar() {
    this.lShowPanelListado = false;
    this.lShowPanelDatos = true;
    this.userForm.reset();
    this.lShowBtnActualizar = false;
    this.lShowBtnEliminar = false;
    this.lShowBtnAdicionar = true;
  }

  cancelar() {
    this.lShowPanelListado = true;
    this.lShowPanelDatos = false;
    this.userForm.reset();
  }

  guardar() {
    this.IsWait = true;
    this.lService.create(this.userForm.value).subscribe((reponse) => {
      this.IsWait = false;
      Swal.fire("Sucursales", "Agregado correctamente.", "success");
      this.loadListado();
      this.userForm.reset();
      this.lShowPanelDatos = false;
      this.lShowPanelListado = true;
    });
  }

  actualizar() {
    this.IsWait = true;

    this.lService.update(this.userForm.value).subscribe((reponse) => {
      this.IsWait = false;
      Swal.fire("Sucursales", "Actualizado correctamente.", "success");
      this.loadListado();
      this.userForm.reset();
      this.lShowPanelDatos = false;
      this.lShowPanelListado = true;
    });
  }

  eliminar() {
    let comercio = this.userForm.value;
    let _id = comercio._id;

    this.IsWait = true;

    this.lService.delete(_id).subscribe((reponse) => {
      this.IsWait = false;

      Swal.fire("Sucursales", "Eliminado correctamente.", "success");

      this.loadListado();
      this.userForm.reset();
      this.lShowPanelDatos = false;
      this.lShowPanelListado = true;
    });
  }  

}
