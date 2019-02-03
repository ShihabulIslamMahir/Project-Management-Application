import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe,private db: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    designationName: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
    joiningDate: new FormControl('', Validators.required),
    departmentName: new FormControl('', Validators.required),
   
  });

  initializeFormGroup(){
     this.form.setValue({
    $key: null,
    firstName: '',
    designationName: '',
    joiningDate: '',
    departmentName: '',
    
  })
  }
  getEmployees(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(employee){
    this.employeeList.push({
    firstName: employee.firstName,
    designationName: employee.designationName,
    joiningDate: employee.joiningDate == "" ? "" : this.datePipe.transform(employee.joiningDate, 'yyyy-MM-dd'),
    departmentName: employee.departmentName
    

    });
  }
  updateEmployee(employee){
    this.employeeList.update(employee.$key,
      {
      firstName: employee.firstName,
      designationName: employee.designationName,
      joiningDate: employee.joiningDate == "" ? "" : this.datePipe.transform(employee.joiningDate, 'yyyy-MM-dd'),
      departmentName: employee.departmentName
      


      }
      
      
      
      );
  }
  deleteEmployee($key: string){
    this.employeeList.remove($key);
  }
  populateForm(employee){
    this.form.setValue(employee);

  }
  getAssignMembers(start, end): AngularFireList<any> {
    
    return this.db.list('/employees', ref => 
        ref.limitToFirst(5).orderByChild('firstName')
    );
  }
 
}
