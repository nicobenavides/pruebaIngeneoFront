import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AuthGuardService } from "./services/auth-guard.service";
import { LoginAdminComponent } from "../login-admin/login-admin.component";
import { SalasComponent } from "../salas/salas.component";
import { SucursalComponent } from "../sucursal/sucursal.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "sucursal", component: SucursalComponent, canActivate: [AuthGuardService], },
      { path: "salas", component: SalasComponent, canActivate: [AuthGuardService], },
    ]
  },
  { path: "login-admin", component: LoginAdminComponent },  
  { path: "**", pathMatch: "full", redirectTo: "login-admin" }, // default route of the module
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
