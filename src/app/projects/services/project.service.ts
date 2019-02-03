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
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
    dateOfBirth: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
   
  });

  initializeFormGroup(){
     this.form.setValue({
    $key: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    
  })
  }
  getProjects(){
    this.projectList = this.firebase.list('projects');
    return this.projectList.snapshotChanges();
  }
  insertProject(project){
    this.projectList.push({
    firstName: project.firstName,
    lastName: project.lastName,
    dateOfBirth: project.dateOfBirth == "" ? "" : this.datePipe.transform(project.dateOfBirth, 'yyyy-MM-dd'),
    country: project.country
    

    });
  }
  updateProject(project){
    this.projectList.update(project.$key,
      {
      firstName: project.firstName,
      lastName: project.lastName,
      dateOfBirth: project.dateOfBirth == "" ? "" : this.datePipe.transform(project.dateOfBirth, 'yyyy-MM-dd'),
      country: project.country
      


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
