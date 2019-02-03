
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private service: ProjectService,
    public dialogRef: MatDialogRef<ProjectComponent>) { 
    
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
    this.service.getProjects();
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

}
