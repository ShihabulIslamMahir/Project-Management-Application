import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { 
    
  }
  maxDate = new Date();
  // maxDate = new Date(2019, 0, 28);
  // maxDate = Date.now();

  countries = [
    {id:1, value: 'Front End'},
    {id:2, value: 'HR'},
    {id:3, value: 'UX'}
 ];

  ngOnInit() {
    this.service.getEmployees();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
      this.service.insertEmployee(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  

}
