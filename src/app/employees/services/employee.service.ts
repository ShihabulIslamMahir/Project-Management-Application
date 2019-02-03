import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  employeeList: AngularFireList<any>;

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
  getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(employee){
    this.employeeList.push({
    firstName: employee.firstName,
    lastName: employee.lastName,
    dateOfBirth: employee.dateOfBirth == "" ? "" : this.datePipe.transform(employee.dateOfBirth, 'yyyy-MM-dd'),
    country: employee.country
    

    });
  }
  updateEmployee(employee){
    this.employeeList.update(employee.$key,
      {
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: employee.dateOfBirth == "" ? "" : this.datePipe.transform(employee.dateOfBirth, 'yyyy-MM-dd'),
      country: employee.country
      


      }
      
      
      
      );
  }
  deleteEmployee($key: string){
    this.employeeList.remove($key);
  }
  populateForm(employee){
    this.form.setValue(employee);

  }
 
}
