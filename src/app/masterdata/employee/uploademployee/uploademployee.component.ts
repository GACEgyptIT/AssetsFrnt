import { Component, OnInit, ViewChild } from "@angular/core";
import * as json2csv from 'json2csv';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, fromEvent } from "rxjs";
import { EmployeeService } from "../services/employee.service";
import { debounceTime, map } from "rxjs/operators";
import { EmployeesUploadModel } from "app/shared/models/EmployeeUploadModel";
import { AssetModel } from "app/shared/models/AssetModel";
import { FileService } from "app/shared/services/downloadfile.service";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { ExportexcelService } from "app/shared/services/exportexcel.service";
import { SweetalertService } from "app/shared/services/sweetalert.service";
import { AppstorageService } from "app/shared/services/appstorage.service";
import { AssetTrackingModel } from "app/shared/models/AssetTrackingModel";
import { LogsService } from "app/shared/services/logs.service";
import { EmployeeModel } from "app/shared/models/EmployeeModel";

@Component({
  selector: 'app-uploademployee',
  templateUrl: './uploademployee.component.html',
  styleUrls: ['./uploademployee.component.css']
})
export class UploademployeeComponent implements OnInit {



  upLoadedEmployees = 0 ; noHrCode = 0; noBranch = 0; noCompany = 0; noDepartment = 0; noDirMngr = 0; 
  isExist = 0;  isNew = 0; isDuplicated =0;   selectedEmployees = 0;
 
  showStatistics = false;
  pageIndex: number = 1;
  loading = false;
  @ViewChild('search') search: any;
  public temp: EmployeeModel[] = [];

  public Employees: EmployeeModel[] = [];
  public columns: Array<object>;
  pageSize: number = 5;
  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];
  SelectedEmployees: EmployeesUploadModel[] = [];
  notificationMessage = '';
  // Export File
  public csvFileName = `test.csv`;
  private Assets_DATA: any[] = [];

  @ViewChild("fileInput") fileInput;
  message: string;
  // noticationMessegeTimer(messege : string, saved?: number, selected?: number) {
    
  //   var x  = setInterval(() => 
  //    {
  //         return this.notificationMessage = '';
  //    },10000);
  //         return this.notificationMessage = saved + messege + selected;
  // }
  // AddAssetTrackingLog(ast: any) {
  //    
  //   var assetTracking = new AssetTrackingModel();
  //   var usr = this.strSrv.getUserFromStorage(); 

  //   assetTracking.From = "Uploaded-Saved";
  //   assetTracking.To = ast.EmployeeName;
  //   assetTracking.empId = ast.empId;
  //   assetTracking.usrId = usr.usrId;

  //   this.logSrv.sendAssetTrackingLog(assetTracking).subscribe(res=>{
  //     console.log(res);
  //     
  //   });
  // }
  // Hide Empty Column
  IsDescriptionExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.Description != '') { is = true } });
    return is;
  }
  IsSerialNumberExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.SerialNumber != '') { is = true } });
    return is;
  }
  IsPartNumberExist() {
    let is = false
//    this.Employees.forEach(x=>{ if(x.PartNumber != '') { is = true } });
    return is;
  }
  IsDialNumberExist() {
    let is = false
    this.Employees.forEach(x=>{ if(x.empFullName != '') { is = true } });
    return is;
  }
  IsCircuitNumberExist() {
    let is = false
//    this.Employees.forEach(x=>{ if(x.CircuitNumber != '') { is = true } });
    return is;
  }
  IsTypeCodeExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.TypeCode != '') { is = true } });
    return is;
  }
  IsTypeNameExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.TypeName != '') { is = true } });
    return is;
  }
  IsEmpHRCodeExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.EmpHRCode != '') { is = true } });
    return is;
  }
  IsEmpNameExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.EmpName != '') { is = true } });
    return is;
  }
  IsCompanyCodeExist() {
    let is = false
    this.Employees.forEach(x=>{ if(x.empFullName != '') { is = true } });
    return is;
  }
  IsCompanyNameExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.CompanyName != '') { is = true } });
    return is;
  }
  IsBranchCodeExist() {
    let is = false
 //   this.Employees.forEach(x=>{ if(x.BranchCode != '') { is = true } });
    return is;
  }
  IsBranchNameExist() {
    let is = false
//    this.Employees.forEach(x=>{ if(x.BranchName != '') { is = true } });
    return is;
  }

  constructor(
    private http: HttpClient,
    private empSrv : EmployeeService,
    private strSrv : AppstorageService,
    private logSrv: LogsService,
    private domSanitizer: DomSanitizer,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alrtSrv: AlertService,
    private swalSrv: SweetalertService,
    private expExcelSrv: ExportexcelService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.onGetAllUploadedEmployees();

    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  // AddUserLog(action: string) {
  //   this.logSrv.sendUserLog(action).subscribe(res=>{
  //   });
  // }
  // notifcationMessegeTimer(messege : string) {
  //   //   
  //   var x  = setInterval(() => 
  //    {
  //         return this.notificationMessage = '';
  //    },10000);
  //         return this.notificationMessage = messege;
  // }
  showCodeGuide = false;
  onShowHideCodeGuide() {
      this.showCodeGuide = !this.showCodeGuide;
  }
  onUpdatestatistics() {
    debugger; 
    
        this.noDepartment = 0;
        this.noHrCode = 0;
        this.noBranch = 0;
        this.noCompany = 0;
        this.isExist = 0;
        this.isNew = 0;
        this.isDuplicated = 0;
        this.selectedEmployees = 0;
    
        this.selectedEmployees = this.SelectedEmployees.length;
        this.upLoadedEmployees = this.Employees.length;

        this.Employees.forEach(a => {
            debugger;  
            if(a.BranchName == "missing"){
              this.noBranch += 1;
            } if (a.CompanyName == "missing") {
              this.noCompany += 1;
            } if (a.DepartmentName == "missing") {
              this.noDepartment += 1;
            } if (a.empFullName == "missing") {
              this.noHrCode += 1;
            } if (a.directMngName == "missing") {
              this.noDirMngr += 1;
            } if (a.checkbox == true) {
              this.isExist += 1;
            } if (a.checkbox == false) {
              this.isNew += 1;
            } if (a.duplicatHrCode == true) {
              this.isDuplicated += 1;
            } 
            ;
        });
  }
  onShowHideStatistics() {
    this.showStatistics = !this.showStatistics;
  }
  onSaveToEmployeesList() {
    if(this.SelectedEmployees.length > 0){
      this.loading = true;
      debugger;
      this.empSrv.saveUploadedEmployees(this.SelectedEmployees).subscribe(( emps: EmployeeModel[] ) => {
           debugger;
           debugger;
           this.loading = false;
        if(emps) { this.loading = false;}
        this.onGetAllUploadedEmployees();
        this.onUpdatestatistics();
        this.swalSrv.showSwal('basic-info', 'Employees With Same Hr Code Are NOT Saved !!', "(" + emps.length + ")  Saved Successfully out of (" + this.SelectedEmployees.length + ")");
      //this.logSrv.sendUserLog("( " + emps.length + " )  Saved Successfully out of ( " + this.SelectedEmployees.length + " )");
        this.SelectedEmployees = [];
        // emps.forEach((ast: AssetModel)=>{
        //   debugger;
        //   this.logSrv.sendAssetTrackingLog(ast, "Uploaded-Saved", ast.EmployeeName).subscribe(logged=>{ 
        //     this.onGetAllUploadedEmployees();
        //   });
        // });
      });
    } else if(this.SelectedEmployees.length == 0) {

      this.swalSrv.showSwal('basic-error', 'You Must Select At Lease One Asset' )
    //  this.alrtSrv.danger('No Asset Selected');
      //  this.noticationMessegeTimer("Please Select Item to Save");
    }

  }
  onClear() {
    //  this.empSrv.deleteAllUploadedAssets(this.Employees).subscribe(res => {
    //   this.alrtSrv.success('Deleted Successfully');
    //   this.logSrv.sendUserLog("Uploaded Employees Deleted Successfully");
    //   this.onGetAllUploadedEmployees();
    //   //  console.log(res);
    // });
  }
  onGetAllUploadedEmployees() {
    this.empSrv.getAllUploadedEmployees().subscribe((employees: EmployeeModel[]) => {
       debugger;
       this.Employees = employees;
       this.temp = employees;
       this.pageIndex = 1;
       var allAssetsCheckBox = <HTMLInputElement> document.getElementById('assetItemALL--');
       allAssetsCheckBox.checked = false;
       this.onUpdatestatistics();
    }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')) {
          this.alertService.danger('Server error');
        }
    });
  }
  uploadFile() {
    debugger;
    this.Employees = [];
    let formData = new FormData();
    this.loading = true;
    formData.append("upload", this.fileInput.nativeElement.files[0]);
        this.empSrv.UploadExcel(formData).subscribe(result => {
          debugger;
          this.logSrv.sendUserLog("Employees File ( " + this.fileInput.nativeElement.files[0].name +  " ) Uploaded" );
          this.message = result.toString();
          this.onGetAllUploadedEmployees();
          this.onUpdatestatistics();
          this.loading = false;
          this.alrtSrv.success('File Uploaded Successfully');
        });
  }

  // Export File
  getCSVDownloadLink() {
 //   
    return this.generateCSVDownloadLink({
      filename: this.csvFileName,
      data: this.Assets_DATA,
      columns: ['AssetId', "AssetDescription", "AssetType", "AssetSN", "AssetPN"]
    });
   // 
  }

  // example: any = { Description: 'aaa', AssetCode: 'aaa', SerialNumber: 'aa',PartNumber: 'rrr', DialNumber: 'rr',TypeName: 'rr', EmpHRCode: 'rr', EmpName: 'rrr', CompanyName: 'rrr', BranchName: 'rrr'}
  // onExportExcel() {
  //   
  //   this.expExcelSrv.exportAsExcelFile(this.SelectedEmployees, 'AssetsList');
  // }
  // you can move this method to a empSrv  // Function to convert the file
  public generateCSVDownloadLink(options: {
    filename: string;
    data: any[];
    columns: string[];
  }): SafeUrl {
    const fields = options.columns;
    const opts = { fields, output: options.filename };
    const csv = json2csv.parse(options.data, opts);
    return this.domSanitizer.bypassSecurityTrustUrl(
      "data:text/csv," + encodeURIComponent(csv)
    );
  }
  onAddToEmployeeList(e, Employees) {

    if (!e.target.checked) {
      // let itemIndex = this.Assets_DATA.filter(value => {value.AssetsId === Employees.AssetsId});
      let index = this.Assets_DATA.findIndex(x => x.AssetsId === Employees.AssetsId);
      this.Assets_DATA.splice(index, 1);
    } else if (e.target.checked) {
      this.Assets_DATA.push({
        AssetsId: Employees.AssetsId,
        AssetsName: Employees.AssetsName,
        EmailId: Employees.EmailId,
        Address: Employees.Address
      });
    }
  }
  onSelectAll(e) {
    
    this.SelectedEmployees = [];
    if(e.target.checked){
        this.Employees.forEach(val => { 
          val.checkbox = true;
          this.SelectedEmployees.push(val);
        });
    } else if(!e.target.checked){
      this.Employees.forEach(val => { val.checkbox = false });
    }
      this.onUpdatestatistics();
  }
  onSelect(e, ast) {
    debugger;
    if(e.target.checked)
    {
      this.SelectedEmployees.push(ast);
      this.onUpdatestatistics();
      let allChecked = true;
      this.Employees.forEach((employee, index) => {
        var assetItemHTMLelemnt =   <HTMLInputElement> document.getElementById('assetItem--' + index);
        if(!assetItemHTMLelemnt.checked) allChecked = false;
      });
      if(allChecked) 
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      assetItemALLHTMLelemnt.checked = true;
    }
    else if (!e.target.checked){
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
          this.onUpdatestatistics();
      this.SelectedEmployees.filter((employee, selectedIndex) => {
        if (employee.empId === ast.empId) {
          debugger;
          this.SelectedEmployees.splice(selectedIndex, 1);
          this.onUpdatestatistics();
        }
      });
    }
  }
  onPrintPreviewSelectedAssets() {
    // console.log(ast);
    // 
    // this.bsModaleRef = this.modalService.show(AddeditasstComponent, {initialState: {ast}});
    // this.bsModaleRef.content.onClose = (updated) => {
    //   if (updated) {
    //     this.onGetAllUploadedEmployees();
    //     console.log('Edit clicked inside');
    //   }
    // };
    // console.log('Edit clicked');
  }
  setOrder(value: string) {
    //
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  onSort(event) {
  }
  ngAfterViewInit(): void {
    //  
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
  onChangeRowsPerPage(event) {

    this.pageSize = event.target.value;
    this.pageIndex = 1;
  }
  updateFilter(val: any) {

    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = Object.keys(this.temp[0]).length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
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
  // Download File
  download() {
    
    this.fileService.downloadEmployeeFile().subscribe(response => {
      debugger;
			let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      window.open(response.url);
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  onDeleteAllSellected() {
    
    this.loading = true;
    if(this.SelectedEmployees.length == 0) {
      this.swalSrv.showSwal('basic-error', 'You Must Select At Least One Asset' );
      this.loading = false;
      // this.notifcationMessegeTimer('No Record Selected');
    } else {
      let ids = [];
      this.SelectedEmployees.forEach(em => {
        ids.push(em.empId);
      });
      this.empSrv.deleteSelectedUploadedEmployees(ids).subscribe((dltemps: AssetModel[]) => {
        debugger;
        this.onUpdatestatistics();
        this.alrtSrv.success( "( " + dltemps + " ) Employees have been deleted Successfully " );
        this.logSrv.sendUserLog( "( " +  dltemps + " ) Uploaded Employees Deleted Successfully");
        this.SelectedEmployees = [];
        this.onGetAllUploadedEmployees();
        this.loading = false;
      }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')){
          this.alrtSrv.danger( 'Server error');
        }
      });
    }
  }
}
