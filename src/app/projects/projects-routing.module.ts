import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: '',
    component: ProjectComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
