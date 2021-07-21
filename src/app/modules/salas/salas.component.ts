import { Component, OnInit } from "@angular/core";
import { SalasService } from "./salas.service";
import { FormControl, FormGroup, Validators, NgModel } from "@angular/forms";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ToolsService } from "../core/services/tools.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-salas",
  templateUrl: "./salas.component.html",
  styleUrls: ["./salas.component.scss"],
})
export class SalasComponent implements OnInit {
  public userForm: FormGroup;
  listado: any = [];

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
  public etiquetaNombreModulo = "Salas";
  public etiquetaListado = "Listado de Salas";

  /*END ETIQUETAS CRUDS*/

  actualItemUrl: any;
  urlTemporal: any;

  selectedFiles: FileList;
  selectedFile: File;

  public filter = {
    name: "",
    location: "",
    description: "",
  };
  public paramsFetchInfo = {
    // filter: {},
    order: { id: "asc" },
    properties: "_id id name location description lat lng ",
  };

  public usuarioEliminar: any;

  constructor(
    private lService: SalasService,
    private toolService: ToolsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadListado(this.paramsFetchInfo);

    this.userForm = new FormGroup({
      _id: new FormControl("", [Validators.maxLength(50)]),
      id: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      location: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lat: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      lng: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    });
  }

  loadListado(obj?) {
    this.IsWait = true;
    this.lService.List(obj).subscribe((data) => {
      this.listado = data;
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
      Swal.fire("Salas", "Agregado correctamente.", "success");
      this.loadListado(this.paramsFetchInfo);
      this.userForm.reset();
      this.lShowPanelDatos = false;
      this.lShowPanelListado = true;
    });
  }

  actualizar() {
    this.IsWait = true;

    this.lService.update(this.userForm.value).subscribe((reponse) => {
      this.IsWait = false;
      Swal.fire("Salas", "Actualizado correctamente.", "success");
      this.loadListado(this.paramsFetchInfo);
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

      Swal.fire("Salas", "Eliminado correctamente.", "success");

      this.loadListado(this.paramsFetchInfo);
      this.userForm.reset();
      this.lShowPanelDatos = false;
      this.lShowPanelListado = true;
    });
  }

  findBy() {
    if (
      this.filter.name.length > 1 ||
      this.filter.location.length > 1 ||
      this.filter.description.length > 1
    ) {
      this.loadListado({ ...this.paramsFetchInfo, filter: this.filter });
    } else {
      this.loadListado(this.paramsFetchInfo);
    }
    this.IsWait = true;
  }
}
