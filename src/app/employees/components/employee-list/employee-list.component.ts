import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private dialog: MatDialog ) { }
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['firstName','designationName','joiningDate','departmentName','actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;
    ngOnInit() {
      this.service.getEmployees().subscribe(
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
  this.dialog.open(EmployeeComponent, dialogConfig);
    }
   
    onEdit(row){
      this.service.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(EmployeeComponent, dialogConfig);
    }
    onDelete($key){
      
      this.service.deleteEmployee($key);
      
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
