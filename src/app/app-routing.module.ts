import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

const routes: Routes = [
  { path: "login", loadChildren: "./modules/core/core.module#CoreModule" },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

export class AppRoutingModule {}
