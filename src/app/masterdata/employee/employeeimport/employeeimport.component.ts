import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
// import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EmployeeADImportedModel } from 'app/shared/models/EmployeeADImportedModel';
import { OrderPipe } from 'ngx-order-pipe';
import { AlertService } from 'ngx-alerts';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import Swal from 'sweetalert2';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { LogsService } from 'app/shared/services/logs.service';

@Component({
  selector: 'app-employeeimport',
  templateUrl: './employeeimport.component.html',
  styleUrls: ['./employeeimport.component.css']
})
export class EmployeeimportComponent implements OnInit {

  totalImportedEmplyees: number = 0;  aleadyExistEmplyees: number = 0;  newEmplyees: number = 0;  selectedEmployess = 0; noHrCode: number = 0; totalEmplyees: number= 0;
  ActiveEmployees: number = 0; ActiveEmployeesNoHrCode: number = 0; ActiveAccounts: number = 0;   ServiceAccounts: number= 0;   ArchiveAccounts: number= 0; InActiveAccounts: number= 0;   // ActiveAccounts: number;   ActiveAccounts: number;

  notificationMessage = '';
  public loading = false;
  sortedCollection: any[];
  @ViewChild('search') search: any;
  public Employees: EmployeeADImportedModel[] = [];
  public temp: EmployeeADImportedModel[] = [];
  public FilteredAccounts : EmployeeADImportedModel[] = [];
  SelectedEmployees: EmployeeADImportedModel[] = [];
  pageSize: number = 5;
  pageIndex: number = 1;
  order: string = "info.name";
  reverse: boolean = false;
 
  // AddUserLog(action: string) {
  //   this.strSrv.sendUserLog(action).subscribe(res=>{
  //   });
  // }
  constructor(
    private logSrv: LogsService,
    private alrtSrv: AlertService,
    private empSrv: EmployeeService,
    private expExcelSrv: ExportexcelService,
    private orderPipe: OrderPipe,
    private swalSrv: SweetalertService
    ) {
      this.sortedCollection = orderPipe.transform(this.Employees, 'IsExist');
      this.onGetAllImportedEmployees();
    }

  ngOnInit() { 
 
  }

  onExportExcel() {
    this.expExcelSrv.exportAsExcelFile(this.SelectedEmployees, 'AD-Accounts');
  }
  onUpdatestatistics() {
    
    this.ActiveEmployees = 0;
    this.ServiceAccounts = 0;
    this.ArchiveAccounts = 0;
    this.ActiveAccounts = 0;
    this.InActiveAccounts = 0;
    this.ActiveEmployeesNoHrCode = 0
    this.noHrCode = 0;
    this.totalImportedEmplyees = 0;
    this.aleadyExistEmplyees = 0;
    this.newEmplyees = 0;
    this.totalEmplyees = 0;
    this.selectedEmployess = 0;
    
    this.selectedEmployess = this.SelectedEmployees.length;
    this.totalImportedEmplyees = this.Employees.length;

    this.Employees.forEach(e => {
         
        if(e.enabled == false){
          this.InActiveAccounts += 1;
        }if(e.accountType == 'Employee'){
          this.totalEmplyees += 1;
        }if(e.archiveAccount == true){
          this.ArchiveAccounts += 1;
        }if(e.serviceAccount == true){
          this.ServiceAccounts += 1;
        }if(e.enabled == true){
          this.ActiveAccounts += 1;
        }if(e.enabled == true && e.hrCode == "No-HrCode" ){
        //  this.ActiveNoHrCode += 1;
        }if(e.IsExist == true){
          this.aleadyExistEmplyees += 1;
        } if (e.IsExist == false) {
          this.newEmplyees += 1;
        } if (e.hrCode == "No-HrCode") {
          this.noHrCode += 1;
        } if(e.enabled == true){

        };
    }); 
    this.ActiveEmployees = this.totalImportedEmplyees;
    this.ActiveEmployees -= this.ArchiveAccounts;
    this.ActiveEmployees -= this.ServiceAccounts;
    this.ActiveEmployeesNoHrCode = this.ActiveEmployees - this.noHrCode;
  }
  onGetAllImportedEmployees() {
          this.loading = true;
          this.empSrv.getAllImportedEmployees().subscribe((emps: EmployeeADImportedModel[]) => {
                    emps.forEach(em=>{
                          if(em.hrCode == "" ){
                            if(em.accountType == 'Employee'){
                              em.hrCode ='No-HrCode';
                            } if(em.accountType == 'Archive' || em.accountType == 'Service') {
                              em.hrCode ='N/A';
                            }
                          }
                    });
                    this.Employees = emps;
                    this.temp = this.Employees;  // for search
                    this.selectedEmployess = 0 ;
                
                    this.onUpdatestatistics();
                    this.loading = false;

           }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')){
                      this.swalSrv.showSwal('basic-error', " Server connection Error / Data is not updated ");
                      this.logSrv.sendUserLog( "Server connection Error ( " + error + " )" );
                    }
           });
  }
  ImportADEmployees() {
        
        this.loading = true;
          this.empSrv.ImportADEmployees().subscribe((emps: EmployeeADImportedModel[]) => {
              
              let activeEmps: EmployeeADImportedModel[] = [];
              emps.forEach(e=>{ 
                if(e.enabled){activeEmps.push(e); };
             //   if(e.accountName == 'tamer.youssry') {     console.log('HR Code' ,e.hrCode)}
              });
              this.empSrv.addImportedAccounts(activeEmps).subscribe((employees: EmployeeADImportedModel[]) => {
                  
                  this.Employees = employees;
                  this.onGetAllImportedEmployees();
                  this.loading = false;
                  var impEmpAllCheckBox = <HTMLInputElement> document.getElementById('impEmpAllCheckBox--');
                  impEmpAllCheckBox.checked = false;
                  this.alrtSrv.success("( " +  employees.length + " ) Imported Employees Successfully");
                  this.logSrv.sendUserLog( "( " +  employees.length + " ) Imported Employees Successfully");
              }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alrtSrv.danger('Server Error');
                      }
                });
           }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')){
                      this.alrtSrv.danger('Server Error');
                    };
         });
  }
  valid = true;
  onSaveToEmployeeList() {
    
    if(this.SelectedEmployees.length == 0){
      this.swalSrv.showSwal('basic-info', 'At least one Employee must be selected');
    } else if (this.SelectedEmployees.length > 0) {
      this.FilteredAccounts = [];
      this.SelectedEmployees.forEach(ac=>{
            if(ac.hrCode == 'No-HrCode' || ac.IsExist == true || ac.enabled == false) {
                this.valid = false
            }
            if(this.valid) {
              this.FilteredAccounts.push(ac);
            }
            this.valid = true;
      });

      Swal.fire({
        title: '</h4>( ' + this.FilteredAccounts.length + ' )  Will be Saved <br> Out of ( ' + this.totalImportedEmplyees  +' ) </h4>',
        icon: 'info',
        html: ' <span> Include accounts for New Employees / Services / Archive  </span> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:  '<i class="fa "></i>Yes Save',
        confirmButtonAriaLabel: '',
        cancelButtonText:  '<i class="fa ">Cancel</i>',
        cancelButtonAriaLabel: ''
      }).then(res => {
        if(res.value){
          this.loading = true;
          
          this.empSrv.saveEmployees(this.FilteredAccounts).subscribe((emps: EmployeeADImportedModel[]) => {
            this.swalSrv.showSwal('basic-success', '( ' + emps.length + ' ) Employees saved Successfully');
            this.logSrv.sendUserLog( "( " +  emps.length + " ) Saved Successfully");
            this.SelectedEmployees = [];
            this.onGetAllImportedEmployees();
            this.loading = false;
      }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')){
              this.swalSrv.showSwal('basic-error', " Server connection Error / Data is not updated ");
            }
      });
        }
      })


    }
 
  }
  onClear() {
    this.empSrv.deleteALLimportedEmployees().subscribe(res => {
      this.onGetAllImportedEmployees();
      this.alrtSrv.success('Cleared Successfully');
    });
  }
  onChangeSearch(val: string) {
  
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e){
 
    // do something when input is focused
  }
  IsHRCodeExist(e) {
   if (e.target.value.length >= 4) {
     this.empSrv.GetEmployeeByCode(e.target.value).subscribe(emp => {
       if(emp) {

       } else if (!emp) {

       }
     });
   }

  }

 onDeleteEmployee(id) {
     this.empSrv.deleteEmployee(id).subscribe(EmployeeAdded => {
       this.ImportADEmployees();
     });
 }
 onSelectAll() {
  
  var impEmpAllCheckBox = <HTMLInputElement> document.getElementById("impEmpAllCheckBox--");
  this.SelectedEmployees = [];
  if(impEmpAllCheckBox.checked) {
       this.Employees.forEach(val => { val.checkbox = true });
       this.Employees.forEach(emp => { this.SelectedEmployees.push(emp) });
  } else if (!impEmpAllCheckBox.checked) {
       this.Employees.forEach(val => { val.checkbox = false });
  }
  this.onUpdatestatistics();  
 }
 onSelect(e, emp, i) {
    if(e.target.checked) {
      console.log(this.SelectedEmployees);
      this.SelectedEmployees.push(emp);
      this.onUpdatestatistics();
      let allChecked = true;
      this.Employees.forEach((asset, index) => {
        var assetItemHTMLelemnt = <HTMLInputElement> document.getElementById('assetItem--' + index);
        if(!assetItemHTMLelemnt.checked) {
          allChecked = false;
        } 
      });

      if(allChecked) 
      var impEmpAllCheckBox = <HTMLInputElement> document.getElementById("impEmpAllCheckBox--");
      impEmpAllCheckBox.checked = true;
      this.onUpdatestatistics();
    } else if (!e.target.checked) {
      var impEmpAllCheckBox = <HTMLInputElement> document.getElementById("impEmpAllCheckBox--");
      if(impEmpAllCheckBox.checked) {
        impEmpAllCheckBox.checked = false;
        this.onUpdatestatistics();
      } 
      this.SelectedEmployees.filter((empployee, selectedIndex) => {
        if (i === selectedIndex) {
          this.SelectedEmployees.splice(selectedIndex, 1);
          this.onUpdatestatistics();
        }
      });
      this.onUpdatestatistics();
    }
   
 }
 IsCheckBoxsSelected() {
  const x =  this.SelectedEmployees.length;
    if(x >= 0) {
      return true
    } else {
      return false;
    }
 }
 onDeleteAllSellected() {
    
    if(this.SelectedEmployees.length == 0) {
      this.alrtSrv.danger('No Record selected');
    } else {
      this.loading = true;
      this.empSrv.deleteSelectedImportedEmployees(this.SelectedEmployees).subscribe((dltemps: EmployeeADImportedModel[]) => {

        this.alrtSrv.success("( " + dltemps.length + " ) Employees Deleted ");
        this.logSrv.sendUserLog( "( " +  dltemps.length + " ) Imported Employees Deleted Successfully");
        this.SelectedEmployees = [];
        this.onGetAllImportedEmployees();
        this.loading = false;
      }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')){
          this.alrtSrv.danger('Server Error');
        }
      });
    }


 }
 onPrintPreviewSelectedEmployees() {
   // console.log(emp);
   // 
   // this.bsModaleRef = this.modalService.show(AddeditasstComponent, {initialState: {emp}});
   // this.bsModaleRef.content.onClose = (updated) => {
   //   if (updated) {
   //     this.onGetAllEmployees();
   //     console.log('Edit clicked inside');
   //   }
   // };
   // console.log('Edit clicked');
 }
 setOrder(value: string) {
   
  //  if (this.order === value) {
  //    this.reverse = !this.reverse;
  //  }
  // if(this.reverse == false){
  //   this.reverse = true;
  // } else {
  //   this.reverse = false;
  // }
   this.reverse = !this.reverse;
   this.order = value;
 }
 onSort(event) {
   // console.log(event);
 }
 updateFilter(val: any) {

 // 
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
 ngAfterViewInit(): void {
  // 
   // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
   // Add 'implements AfterViewInit' to the class.

  //  this.onUpdatestatistics();
   
   fromEvent(this.search.nativeElement, 'keydown')
     .pipe(
       debounceTime(550),
       map(x => x['target']['value'])
     )
     .subscribe(value => {
       this.updateFilter(value);
     });

    //  this.onUpdatestatistics();
 }
 onChangeRowsPerPage(event) {
  this.pageSize = event.target.value;
  this.pageIndex = 1;
 }
 onFilterByNoHrCode(e) {
  
  if(e.target.value == 'ShowAll') {
        this.onGetAllImportedEmployees();
  } else if(e.target.value == 'No-HrCode') {
        this.Employees = [];
        this.temp.forEach(emp => {
          
          if(emp.hrCode == 'No-HrCode' ){
              this.Employees.push(emp);
          }
        });
  } else if(e.target.value == 'EmployeesAccs') {
        this.Employees = [];
        this.temp.forEach(emp => {
          
          if(emp.accountType == "Employee" ){
              this.Employees.push(emp);
          }
        });
  } else if(e.target.value == 'ServiceAccounts') {
        this.Employees = [];
        this.temp.forEach(emp => {
          
          if(emp.serviceAccount == true ){
              this.Employees.push(emp);
          }
        });
  } else if(e.target.value == 'ArchiveAccounts') {
        this.Employees = [];
        this.temp.forEach(emp => {
          
          if(emp.archiveAccount == true ){
              this.Employees.push(emp);
          }
        });
  } else if(e.target.value == 'ActiveEmpsNoCode') {
        this.Employees = [];
        this.temp.forEach(emp => {
   
          if(emp.enabled == true && emp.hrCode == 'No-HrCode' 
              && emp.archiveAccount == false && emp.serviceAccount == false 
              ){
                
              this.Employees.push(emp);
          }
        });
  }

 }

}
