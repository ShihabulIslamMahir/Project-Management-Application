import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  projectList: AngularFireList<any>;

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    projectName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    assignMember: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
    descriptions: new FormControl('', ),
    projectType: new FormControl('', Validators.required),
   
  });

  initializeFormGroup(){
     this.form.setValue({
    $key: null,
    projectName: '',
    assignMember: '',
    descriptions: '',
    projectType: '',
    
  })
  }
  getProjects(){
    this.projectList = this.firebase.list('projects');
    return this.projectList.snapshotChanges();
  }
  insertProject(project){
    this.projectList.push({
    projectName: project.projectName,
    assignMember: project.assignMember,
    descriptions: project.descriptions ,
    projectType: project.projectType
    

    });
  }
  updateProject(project){
    this.projectList.update(project.$key,
      {
      projectName: project.projectName,
      assignMember: project.assignMember,
      descriptions: project.descriptions,
      projectType: project.projectType
      


      }
      
      
      
      );
  }
  deleteProject($key: string){
    this.projectList.remove($key);
  }
  populateForm(project){
    this.form.setValue(project);

  }
  
 
}
