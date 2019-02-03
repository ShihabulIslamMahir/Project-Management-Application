
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialogRef } from '@angular/material';
import { EmployeeService } from 'src/app/employees/services/employee.service';
import { Subject } from 'rxjs'
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  employees;
  startAt = new Subject()
  endAt = new Subject()
  constructor(private service: ProjectService,
    public dialogRef: MatDialogRef<ProjectComponent>,private employeesSvc: EmployeeService) { 
    
  }
  maxDate = new Date();
  // maxDate = new Date(2019, 0, 28);
  // maxDate = Date.now();

  projectTypes = [
    {id:1, value: 'Insurance'},
    {id:2, value: 'Banking'},
    {id:3, value: 'Smart City'},
    {id:4, value: 'Swiss Project'},
    {id:5, value: 'German Project'},
    {id:6, value: 'Local Project'}
 ];

  ngOnInit() {
    this.service.getProjects();

    this.employeesSvc.getAssignMembers(this.startAt, this.endAt).valueChanges().subscribe(employees => this.employees = employees)
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
      this.service.insertProject(this.service.form.value);
      else
      this.service.updateProject(this.service.form.value);
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
  search($event) {
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")
}

}
