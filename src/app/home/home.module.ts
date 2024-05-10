import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }
