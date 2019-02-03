import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './components/project/project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    ProjectComponent,
    ProjectListComponent,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    SharedModule,
    FormsModule
  ]
})
export class ProjectsModule { }
