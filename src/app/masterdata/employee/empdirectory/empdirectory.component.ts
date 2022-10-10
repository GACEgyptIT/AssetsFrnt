import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { EmployeeService } from '../services/employee.service';
import { AlertService } from 'ngx-alerts';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { DomainService } from 'app/masterdata/domain/services/domain.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';
import { DepartmentService } from 'app/masterdata/department/services/department.service';

@Component({
  selector: 'app-empdirectory',
  templateUrl: './empdirectory.component.html',
  styleUrls: ['./empdirectory.component.css']
})
export class EmpdirectoryComponent implements OnInit {

  loading = false;
  temp: EmployeeModel[] = [];
  EmployeesList: EmployeeModel[] = [];
  Employees: EmployeeModel[] = [];
  SelectedEmployees: EmployeeModel[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  @ViewChild('search') search: any;
  searchForm: FormGroup;
  public Departments: DepartmentModel[] = [];
  Branchs: BranchsModel[] = [];
  Companys: CompanyModel[] = [];
  
  constructor(        
     private empSrv: EmployeeService,
     private alertService: AlertService,
     private expExcelSrv: ExportexcelService,
     private fb: FormBuilder,
     private brnSrv: BranchService,
     private dptSrv: DepartmentService,
     private comSrv: CompanyService
     ) { }

  ngOnInit(): void {
    this.buildSearchForm();
    this.onGetAllEmployees();
    this.onGetAllCompanys();
    this.onGetAllBranchs();
    this.onGetAllDepartments();
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      DepartmentName: new FormControl(''),
      BranchName: new FormControl(''),
      CompanyName: new FormControl('')
    });
  }
  searchFilter(filters: any): void {
    this.loading = true;
    this.empSrv.getAllEmployeesWithAssets().subscribe((employees: EmployeeModel[]) => {
          debugger;
          this.Employees = [];
          this.Employees = employees;

          Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
          const keys = Object.keys(filters);
          const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
          const emps = this.Employees.filter(filterEmps);
          this.Employees = emps;
          this.loading = false;
        //  this.onUpdatestatistics();
          this.pageIndex = 1;
    });
  }
  onGetAllEmployees() {
    this.loading = true;
    this.empSrv.getAllEmployeesWithEmails().subscribe((emps: EmployeeModel[]) => {   
            debugger;
            this.Employees = emps;
            this.temp = emps;  // for search
            this.EmployeesList = emps; 
            this.loading = false;
     }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server Error');
            }
    });
  }
  onGetAllCompanys() {
    this.loading = true;
    this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
            this.Companys = coms;
     }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
    });
  }
  onGetAllDepartments() {
   //  
        this.dptSrv.getAllDepartments().subscribe((dpts: DepartmentModel[]) => {
     //    
          this.Departments = dpts;
         
         });
  }
  onGetAllBranchs() {
    //  
         this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
      //    
           this.Branchs = brns;
          
          });
  }

  ngAfterViewInit(): void {
       // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
       // Add 'implements AfterViewInit' to the class.
       fromEvent(this.search.nativeElement, 'keydown')
         .pipe(
           debounceTime(550),
           map(x => x['target']['value'])
         )
         .subscribe(value => {
           this.updateFilter(value);
         });
  }
  updateFilter(val: any) {
    // console.log(Object.keys(this.temp[0]).length);
    const value = val.toString().toLowerCase().trim();
    // 
    // get the amount of columns in the table
    const count = Object.keys(this.temp[0]).length;
    // 
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // 
    // assign filtered matches to the active datatable
    this.Employees = this.temp.filter(item => {
      // 
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          // console.log(item, 1);
          return true;
        }
      }
    });

    //Whenever the filter changes, always go back to the first page
  }
  onFilterBy(e) {
        
    if(e.target.selectedOptions[0].text.toString() == 'Show All') {
          // this.showByEmployees = false;
          this.onGetAllEmployees();
    } else if(e.target.selectedOptions[0].text.toString() == 'No-Hr-Code') {

          // this.showByEmployees = false;
          //  this.onGetAllAssets();
          let val = e.target.selectedOptions[0].text.toString();
          
          // console.log(Object.keys(this.temp[0]).length);
          const value = val.toString().toLowerCase().trim();
          
          // get the amount of columns in the table
          const count = Object.keys(this.temp[0]).length;
          
          // get the key names of each column in the dataset
          const keys = Object.keys(this.temp[0]);
          
          // assign filtered matches to the active datatable
          this.Employees = this.temp.filter(item => {
            
            // iterate through each row's column data
            for (let i = 0; i < count; i++) {
              // check for a match
              if (
                (item[keys[i]] &&
                  item[keys[i]]
                    .toString()
                    .toLowerCase()
                    .indexOf(value) !== -1) ||
                !value
              ) {
                // found match, return true to add to result set
                // console.log(item, 1);
                return true;
              }
            }
          });
    }

  }
  onSelectAll() {
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      this.SelectedEmployees = [];
      if(assetItemALLHTMLelemnt.checked) {
            this.Employees.forEach(val => { val.checkbox = true });
            this.Employees.forEach(emp => { this.SelectedEmployees.push(emp) });
      } else if (!assetItemALLHTMLelemnt.checked) {
            this.Employees.forEach(val => { val.checkbox = false });
      }
  }
  onSelect(e, emp) {
     if(e.target.checked)
     {
       this.SelectedEmployees.push(emp);
       let allChecked = true;
       this.Employees.forEach((asset, index) => {
         var assetItemHTMLelemnt =     <HTMLInputElement> document.getElementById('assetItem--' + index);
         if(!assetItemHTMLelemnt.checked) allChecked = false;
       });
       if(allChecked) 
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       assetItemALLHTMLelemnt.checked = true;
       // this.onUpdatestatistics();
     }
     else if (!e.target.checked){
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
       this.SelectedEmployees.filter((asset, selectedIndex) => {
         if (asset.empId === emp.empId) {
           this.SelectedEmployees.splice(selectedIndex, 1);
         }
       });
     }
     // console.log('Selected Employees:  ' ,  this.SelectedEmployees);
     // console.log(' Employees:  ' ,  this.Employees);
     // 
  }
  onChangeRowsPerPage(event) {
    this.pageSize = event.target.value;
  }
  onExportExcel() {
    this.expExcelSrv.exportAsExcelFile(this.SelectedEmployees, 'AddressBook');
  }

}
