import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {SharedModule} from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateRoutingModule } from './template-routing.module';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    TemplateRoutingModule
  ],
  exports:[
    NavBarComponent,
    SharedModule,
    FlexLayoutModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
