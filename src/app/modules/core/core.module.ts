import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ServicesService } from "./services/services.service";
import { DashboardComponent } from "../core/dashboard/dashboard.component";
import { routing } from "./core.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../core/material.module";
import { MyNavComponent } from "./my-nav/my-nav.component";
import { LoadingComponent } from "./loading/loading.component";
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
} from "@angular/material";
import { LoginAdminComponent } from "../login-admin/login-admin.component";
import { SalasComponent } from "../salas/salas.component";
import { SucursalComponent } from "../sucursal/sucursal.component";

@NgModule({
  declarations: [
    //componentes
    MyNavComponent,
    LoadingComponent,
    LoginAdminComponent,
    SalasComponent,
    SucursalComponent,
    DashboardComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    //    ProductosComponent
    //componentes de rutas
  ],

  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyNavComponent,
    //    ProductosComponent
  ],

  providers: [ServicesService],
  bootstrap: [], //componente
  entryComponents: [LoadingComponent],
})
export class CoreModule {}
