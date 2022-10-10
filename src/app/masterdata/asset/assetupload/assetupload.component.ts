import { Component, OnInit, ViewChild } from "@angular/core";
import * as json2csv from 'json2csv';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, fromEvent } from "rxjs";
import { AssetService } from "../services/asset.service";
import { debounceTime, map } from "rxjs/operators";
import { AssetsUploadModel } from "app/shared/models/AssetsUploadModel";
import { AssetModel } from "app/shared/models/AssetModel";
import { FileService } from "app/shared/services/downloadfile.service";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { ExportexcelService } from "app/shared/services/exportexcel.service";
import { SweetalertService } from "app/shared/services/sweetalert.service";
import { AppstorageService } from "app/shared/services/appstorage.service";
import { AssetTrackingModel } from "app/shared/models/AssetTrackingModel";
import { LogsService } from "app/shared/services/logs.service";

@Component({
  selector: 'app-assetupload',
  templateUrl: './assetupload.component.html',
  styleUrls: ['./assetupload.component.css']
})
export class AssetuploadComponent implements OnInit {

  upLoadedAssets = 0; noAssetCode = 0 ;  noAssetTypeCode = 0; noHrCode = 0; noBranch = 0; noCompany = 0; isExist = 0;  isNew = 0;   selectedAssets = 0;
  astCodeDuplication = 0;  astSNDuplication = 0; astDialNumDuplication = 0;
 
  showStatistics = false;
  pageIndex: number = 1;
  loading = false;
  @ViewChild('search') search: any;
  public temp: AssetsUploadModel[] = [];
  public Assets: AssetsUploadModel[] = [];
  public columns: Array<object>;
  pageSize: number = 5;
  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];
  SelectedAssets: AssetsUploadModel[] = [];
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
  //   assetTracking.astId = ast.astId;
  //   assetTracking.usrId = usr.usrId;

  //   this.logSrv.sendAssetTrackingLog(assetTracking).subscribe(res=>{
  //     console.log(res);
  //     
  //   });
  // }
  // Hide Empty Column
  IsDescriptionExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.Description != '') { is = true } });
    return is;
  }
  IsSerialNumberExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.SerialNumber != '') { is = true } });
    return is;
  }
  IsPartNumberExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.PartNumber != '') { is = true } });
    return is;
  }
  // IsDialNumberExist() {
  //   let is = false
  //   this.Assets.forEach(x=>{ if(x.DialNumber != '') { is = true } });
  //   return is;
  // }
  // IsCircuitNumberExist() {
  //   let is = false
  //   this.Assets.forEach(x=>{ if(x.CircuitNumber != '') { is = true } });
  //   return is;
  // }
  // IsTypeCodeExist() {
  //   let is = false
  //   this.Assets.forEach(x=>{ if(x.TypeCode != '') { is = true } });
  //   return is;
  // }
  IsPartnamberExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.PartNumber != '') { is = true } });
    return is;
  }
  IsEmpHRCodeExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.EmpHRCode != '') { is = true } });
    return is;
  }
  IsEmpNameExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.EmpName != '') { is = true } });
    return is;
  }
  IsCompanyCodeExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.CompanyCode != '') { is = true } });
    return is;
  }
  IsCompanyNameExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.CompanyName != '') { is = true } });
    return is;
  }
  IsBranchCodeExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.BranchCode != '') { is = true } });
    return is;
  }
  IsBranchNameExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.BranchName != '') { is = true } });
    return is;
  }

  constructor(
    private http: HttpClient,
    private astSrv : AssetService,
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
    this.onGetAllAssets();

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
    //    
        this.upLoadedAssets = 0;
        this.noAssetCode = 0;
        this.noAssetTypeCode = 0;
        this.noHrCode = 0;
        this.noBranch = 0;
        this.noCompany = 0;
        this.isExist = 0;
        this.isNew = 0;
        this.astCodeDuplication = 0;
        this.astSNDuplication = 0;
        this.astDialNumDuplication = 0;
        this.selectedAssets = 0;
    
        this.selectedAssets = this.SelectedAssets.length;
        this.upLoadedAssets = this.Assets.length;

        this.Assets.forEach(a => {
        //    
            if(a.BranchName == null){
              this.noBranch += 1;
            } if (a.CompanyName == null) {
              this.noCompany += 1;
            } if (a.EmpHRCode == null) {
              this.noHrCode += 1;
            } if (a.AssetTypeName == null) {   // need review
              this.noAssetTypeCode += 1;
            } if (a.AssetCode == '') {
              this.noAssetCode += 1;
            } if (a.IsExist == true) {
              this.isExist += 1;
            } if (a.IsExist == false) {
              this.isNew += 1;
            } if (a.duplicatCode == true) {
              this.astCodeDuplication += 1;
            } if (a.duplicatSerialNumber == true) {
              this.astSNDuplication += 1;
            } if (a.duplicatDailNumber == true) {
              this.astDialNumDuplication += 1;
            } 
            ;
        });
  }
  onShowHideStatistics() {
    this.showStatistics = !this.showStatistics;
  }
  onSaveToAssetsList() {
    debugger;
    if(this.SelectedAssets.length > 0){
      this.loading = true;
      debugger;
      this.astSrv.saveUploadedAssets(this.SelectedAssets).subscribe((asts: AssetModel[]) => {
        debugger;
        this.onGetAllAssets();
        this.loading = false;
        this.swalSrv.showSwal('basic-info', 'Either Code exist or duplicated or Employee missing !!', "(" + asts.length + ")  Saved Successfully out of (" + this.SelectedAssets.length + ")");
     //   this.logSrv.sendUserLog("( " + asts.length + " )  Saved Successfully out of ( " + this.SelectedAssets.length + " )");
        this.SelectedAssets = [];
        
        // asts.forEach(ast=>{
        //   debugger;
        //   // this.logSrv.sendAssetTrackingLog(ast, "Uploaded-Saved", ast.EmployeeName).subscribe(logged=>{ 
        //   //   debugger;
        //   //   this.onGetAllAssets();
        //   // });
        //   // this.logSrv.sendUserLog('Asset Created Successfully').subscribe(res=>{
        //   //   this.logSrv.sendAssetTrackingLog(ast,  "Uploaded-Saved", ast.EmployeeName).subscribe(res=>{

        //   //   });
        //   // });
        // });
      }, err => {      debugger;  console.log(err); });
    } else if(this.SelectedAssets.length == 0) {

      this.swalSrv.showSwal('basic-error', 'You Must Select At Lease One Asset' )
    //  this.alrtSrv.danger('No Asset Selected');
      //  this.noticationMessegeTimer("Please Select Item to Save");
    }

  }
  onClear() {
     this.astSrv.deleteAllUploadedAssets(this.Assets).subscribe(res => {
      this.alrtSrv.success('Deleted Successfully');
      this.logSrv.sendUserLog("Uploaded Assets Deleted Successfully");
      this.onGetAllAssets();
      //  console.log(res);
    });
  }
  onGetAllAssets() {
    this.loading = true;
    this.astSrv.getAllUploadedAssets().subscribe((assets: AssetsUploadModel[]) => {
       debugger;
       this.Assets = assets;
       this.temp = assets;
       this.pageIndex = 1;
       this.loading = false;
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
        this.Assets = [];
        let formData = new FormData();
        this.loading = true;
        formData.append("upload", this.fileInput.nativeElement.files[0]);
        this.astSrv.UploadExcel(formData).subscribe(result => {
          formData = new FormData();
          this.logSrv.sendUserLog("Assets File ( " + this.fileInput.nativeElement.files[0].name +  " ) Uploaded" ).subscribe(re=>{

          });
          this.message = result.toString();
          this.onGetAllAssets();
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
  //   this.expExcelSrv.exportAsExcelFile(this.SelectedAssets, 'AssetsList');
  // }
  // you can move this method to a astSrv  // Function to convert the file
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
  onAddToEmployeeList(e, Assets) {

    if (!e.target.checked) {
      // let itemIndex = this.Assets_DATA.filter(value => {value.AssetsId === Assets.AssetsId});
      let index = this.Assets_DATA.findIndex(x => x.AssetsId === Assets.AssetsId);
      this.Assets_DATA.splice(index, 1);
    } else if (e.target.checked) {
      this.Assets_DATA.push({
        AssetsId: Assets.AssetsId,
        AssetsName: Assets.AssetsName,
        EmailId: Assets.EmailId,
        Address: Assets.Address
      });
    }
  }
  onSelectAll(e) {
    
    this.SelectedAssets = [];
    if(e.target.checked){
        this.Assets.forEach(val => { 
          val.checkbox = true;
          this.SelectedAssets.push(val);
        });
    } else if(!e.target.checked){
      this.Assets.forEach(val => { val.checkbox = false });
    }
      this.onUpdatestatistics();
  }
  onSelect(e, ast) {
    if(e.target.checked)
    {
      this.SelectedAssets.push(ast);
      this.onUpdatestatistics();
      let allChecked = true;
      this.Assets.forEach((asset, index) => {
        var assetItemHTMLelemnt = <HTMLInputElement> document.getElementById('assetItem--' + index);
        if(!assetItemHTMLelemnt.checked) { allChecked = false; };
      });
      if(allChecked) {
        var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
        assetItemALLHTMLelemnt.checked = true;
      }

    }
    else if (!e.target.checked){
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      if(assetItemALLHTMLelemnt.checked) { assetItemALLHTMLelemnt.checked = false; }
          this.onUpdatestatistics();
      this.SelectedAssets.filter((asset, selectedIndex) => {
        if (asset.astId === ast.astId) {
          this.SelectedAssets.splice(selectedIndex, 1);
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
    //     this.onGetAllAssets();
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
   debugger;
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
    debugger 
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = Object.keys(this.temp[0]).length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.Assets = this.temp.filter(item => {
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
    
    this.fileService.downloadFile().subscribe(response => {
      
			let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      window.open(response.url);
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  onDeleteAllSellected() {
    
    this.loading = true;
    if(this.SelectedAssets.length == 0) {
      this.swalSrv.showSwal('basic-error', 'You Must Select At Least One Asset' );
      this.loading = false;
      // this.notifcationMessegeTimer('No Record Selected');
    } else {
      let ids = [];
      this.SelectedAssets.forEach(em => {
        ids.push(em.astId);
      });
      this.astSrv.deleteSelectedUploadedAssets(ids).subscribe((dltemps: AssetModel[]) => {
        this.onUpdatestatistics();
        this.alrtSrv.success( "( " + dltemps.length + " ) Assets have been deleted Successfully " );
        this.logSrv.sendUserLog( "( " +  dltemps.length + " ) Uploaded Assets Deleted Successfully");
        this.SelectedAssets = [];
        this.onGetAllAssets();
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
