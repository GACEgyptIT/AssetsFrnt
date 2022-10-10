import { Component, EventEmitter, OnInit, Input, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { FormBuilder } from '@angular/forms';
import { AssetModel } from 'app/shared/models/AssetModel';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AssetsUploadModel } from 'app/shared/models/AssetsUploadModel';
import { HttpClient } from '@angular/common/http';
import { AssetService } from 'app/masterdata/asset/services/asset.service';
import { FileService } from 'app/shared/services/downloadfile.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

function readBase64(file) {

  debugger;

  var reader  = new FileReader();
  var future = new Promise((resolve, reject) => {

    debugger;
    reader.addEventListener("load", function () {
      debugger;
      resolve(reader.result);
    }, false);

    reader.addEventListener("error", function (event) {
      debugger;
      reject(event);
    }, false);

    reader.readAsDataURL(file);
    debugger;
  });
}

@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.css']
})
export class UploadimgComponent  {

  upLoadedAssets = 0; noAssetCode = 0 ;  noAssetTypeCode = 0; noHrCode = 0; noBranch = 0; noCompany = 0; isExist = 0;  isNew = 0; isDuplicated =0;   selectedAssets = 0;
 
  showStatistics = false;
  pageIndex: number = 1;
  public loading = false;
  @ViewChild('search') search: any;
  public temp: AssetsUploadModel[] = [];
  public Assets: AssetsUploadModel[] = [];
  // public Assets = new Array<AssetModel>();
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
  noticationMessegeTimer(messege : string, saved?: number, selected?: number) {
    debugger;
    var x  = setInterval(() => 
     {
          return this.notificationMessage = '';
     },10000);
          return this.notificationMessage = saved + messege + selected;
   }
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
  IsTypeNameExist() {
    let is = false
    this.Assets.forEach(x=>{ if(x.AssetTypeName != '') { is = true } });
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
    private domSanitizer: DomSanitizer,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alrtSrv: AlertService
  ) {}

  ngOnInit() {
    this.onGetAllAssets();

    // const data = 'some text';
    // const blob = new Blob([data], { type: 'application/octet-stream' });
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  notifcationMessegeTimer(messege : string) {
    //   debugger;
    var x  = setInterval(() => 
     {
          return this.notificationMessage = '';
     },10000);
          return this.notificationMessage = messege;
  }
  showCodeGuide = false;
  onShowHideCodeGuide() {
      this.showCodeGuide = !this.showCodeGuide;
  }
  onUpdatestatistics() {
    //    debugger;
        this.upLoadedAssets = 0;
        this.noAssetCode = 0;
        this.noAssetTypeCode = 0;
        this.noHrCode = 0;
        this.noBranch = 0;
        this.noCompany = 0;
        this.isExist = 0;
        this.isNew = 0;
        this.isDuplicated = 0;
        this.selectedAssets = 0;
    
        this.selectedAssets = this.SelectedAssets.length;
        this.upLoadedAssets = this.Assets.length;
    
        console.log(this.Assets);
        this.Assets.forEach(a => {
        debugger;
            if(a.BranchCode == null){
              this.noBranch += 1;
            } if (a.CompanyCode == null) {
              this.noCompany += 1;
            } if (a.EmpHRCode == null) {
              this.noHrCode += 1;
            } if (a.astBrandCode == null) {   // need review
              this.noAssetTypeCode += 1;
            } if (a.AssetCode == '') {
              this.noAssetCode += 1;
            } if (a.IsExist == true) {
              this.isExist += 1;
            } if (a.IsExist == false) {
              this.isNew += 1;
            } if (a.duplicatCode == true) {
              this.isDuplicated += 1;
            } 
            ;
        });
  }
  onShowHideStatistics() {
    this.showStatistics = !this.showStatistics;
  }
  onSaveToAssetsList() {

    if(this.SelectedAssets.length > 0){
      debugger;
     
      this.astSrv.saveUploadedAssets(this.SelectedAssets).subscribe(( asts: AssetsUploadModel[] ) => {
        debugger;
        this.onGetAllAssets();
        this.onUpdatestatistics();
        this.noticationMessegeTimer(  "  Asset(s) saved out of:  " , asts.length , this.SelectedAssets.length );
        this.SelectedAssets = [];
        this.alrtSrv.success('Assets Saved Successfully');
      });
    } else if(this.SelectedAssets.length == 0) {
      this.alrtSrv.danger('No Asset Selected');
       this.noticationMessegeTimer("Please Select Item to Save");
    }

  }
  onClear() {
 //   debugger;
     this.astSrv.deleteAllUploadedAssets(this.Assets).subscribe(res => {
      this.alrtSrv.success('Deleted Successfully');
      this.onGetAllAssets();
      //  console.log(res);
    });
  }
  onGetAllAssets() {
  //  debugger;
    this.astSrv.getAllUploadedAssets().subscribe((assets: AssetsUploadModel[]) => {
       this.Assets = assets;
       this.temp = assets;
    });
  }
  uploadFile() {
 //   debugger;
    this.Assets = [];
    let formData = new FormData();
    this.loading = true;
    formData.append("upload", this.fileInput.nativeElement.files[0]);

        this.astSrv.UploadExcel(formData).subscribe(result => {
          this.message = result.toString();
          this.onGetAllAssets();
          this.onUpdatestatistics();
          this.loading = false;
          this.alrtSrv.success('File Uploaded Successfully');
        });
  }
  // Export File
//   getCSVDownloadLink() {
//  //   debugger;
//     return this.generateCSVDownloadLink({
//       filename: this.csvFileName,
//       data: this.Assets_DATA,
//       columns: ['AssetId', "AssetDescription", "AssetType", "AssetSN", "AssetPN"]
//     });
//    // debugger;
//   }
  // you can move this method to a astSrv  // Function to convert the file
  // public generateCSVDownloadLink(options: {
  //   filename: string;
  //   data: any[];
  //   columns: string[];
  // }): SafeUrl {
  //   const fields = options.columns;
  //   const opts = { fields, output: options.filename };
  //   // const csv = json2csv.parse(options.data, opts);
  //   return this.domSanitizer.bypassSecurityTrustUrl(
  //     // "data:text/csv," + encodeURIComponent(csv)
  //   );
  // }
  onAddToEmployeeList(e, Assets) {
    console.log(e);
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
  onSelectAll() {
   // debugger;
    if (this.Assets.every(val => val.checkbox == true))
    {
      this.Assets.forEach(val => { val.checkbox = false });
      this.SelectedAssets = [];
      this.onUpdatestatistics();
    } else {
      this.Assets.forEach(val => { val.checkbox = true });
      this.Assets.forEach(ast => {
          this.SelectedAssets.push(ast);
          this.onUpdatestatistics();
      });
    }  
    this.onUpdatestatistics();
  }
  onSelect(e, ast) {
   // debugger;
    console.log(e);
    if(e.target.checked)
    {
      this.SelectedAssets.push(ast);
      this.onUpdatestatistics();
      let allChecked = true;
      this.Assets.forEach((asset, index) => {
        var assetItemHTMLelemnt =     <HTMLInputElement> document.getElementById('assetItem--' + index);
        if(!assetItemHTMLelemnt.checked) allChecked = false;
        console.log(this.SelectedAssets);
      });
      if(allChecked) 
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      assetItemALLHTMLelemnt.checked = true;
      // console.log('Selected Assets:  ' ,  this.SelectedAssets);
    }
    else if (!e.target.checked){
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
          this.onUpdatestatistics();
      this.SelectedAssets.filter((asset, selectedIndex) => {
        if (asset.astId === ast.astId) {
          this.SelectedAssets.splice(selectedIndex, 1);
          this.onUpdatestatistics();
        }
      });
    }
    console.log('Selected Assets:  ' ,  this.SelectedAssets);
    console.log(' Assets:  ' ,  this.Assets);
    //debugger;
  }
  onPrintPreviewSelectedAssets() {
    // console.log(ast);
    // debugger;
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
    //debugger;
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  onSort(event) {
    console.log(event);
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
    // debugger;
    // console.log(event);
    // console.log(event.target.value);
    this.pageSize = event.target.value;
  }
  updateFilter(val: any) {
   // debugger;
    console.log(Object.keys(this.temp[0]).length);
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = Object.keys(this.temp[0]).length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.Assets = this.temp.filter(item => {
    //  debugger;
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
          console.log(item, 1);
          return true;
        }
      }
    });

    //Whenever the filter changes, always go back to the first page
  }
  // Download File
  download() {
    debugger;
    this.fileService.downloadFile().subscribe(response => {
      debugger;
			let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			const url= window.URL.createObjectURL(blob);
      window.open(url);
 

      debugger;
      window.location.href = response.url;
      debugger;
      this.router.navigate(['/masterdata/assetsupload']);
			//fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  onDeleteAllSellected() {
    debugger;
    this.loading = true;
    if(this.SelectedAssets.length == 0) {
      this.notifcationMessegeTimer('No Record Selected');
    } else {
      let ids = [];
      this.SelectedAssets.forEach(em => {
        ids.push(em.astId);
      });
      this.astSrv.deleteSelectedAssets(ids).subscribe((dltemps: AssetModel[]) => {
        this.onUpdatestatistics();
        this.notifcationMessegeTimer("( " + dltemps.length + " ) Assets Deleted ");
        this.SelectedAssets = [];
        this.onGetAllAssets();
        this.loading = false;
      }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')){
          this.notifcationMessegeTimer( 'Server connection Error / Data is not updated');
        }
      });
    }
  }


  
  

}
