import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private service: ProjectService,
    private dialog: MatDialog ) { }
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['projectName','assignMember','descriptions','projectType','actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;
    ngOnInit() {
      this.service.getProjects().subscribe(
        list => {
          let array = list.map(item => {
            return{
              $key: item.key,
             ...item.payload.val()
            };
            
          });
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
        });
    }
    onCreate(){
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
  this.dialog.open(ProjectComponent, dialogConfig);
    }
   
    onEdit(row){
      this.service.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ProjectComponent, dialogConfig);
    }
    onDelete($key){
      
      this.service.deleteProject($key);
      
      this.paginator.pageIndex= this.paginator.pageIndex-1;
    
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
