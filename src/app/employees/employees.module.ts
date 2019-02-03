import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [EmployeeComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    EmployeeComponent,
    EmployeeListComponent,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    SharedModule,
    FormsModule
  ]
})
export class EmployeesModule { }
