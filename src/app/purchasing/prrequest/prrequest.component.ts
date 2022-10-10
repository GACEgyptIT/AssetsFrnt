import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { PurchasingRequestModel } from 'app/shared/models/PurchaseRequestModel';
import { OrderPipe } from "ngx-order-pipe";
import { fromEvent } from "rxjs";
import { map, debounceTime } from 'rxjs/operators';
import { ExportexcelService } from '../../shared/services/exportexcel.service';
import { BranchsModel } from 'app/shared/models/BrachModel';

import { CompanyModel } from 'app/shared/models/CompanyModel';

import { PositionModel } from 'app/shared/models/PositionModel';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';


import { AlertService } from 'ngx-alerts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UploadimgComponent } from 'app/operation/uploadimg/uploadimg.component';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import { Router } from '@angular/router';
// import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { DomainModel } from 'app/shared/models/DomainModel';

import { AppstorageService } from 'app/shared/services/appstorage.service';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { EmailService } from 'app/shared/services/email.service';

import { ADArchiveAccModel } from 'app/shared/models/ADArchiveAccModel';
import { AssetModel } from 'app/shared/models/AssetModel';
import { LogsService } from 'app/shared/services/logs.service';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import { PrService } from './service/pr.service';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { ItemService } from '../item/service/item.service';
import { RoleModel } from 'app/shared/models/RoleModel';

@Component({
  selector: 'app-prrequest',
  templateUrl: './prrequest.component.html',
  styleUrls: ['./prrequest.component.css']
})
export class PrrequestComponent implements OnInit {
  emp: EmployeeModel;
  prForm: FormGroup;
  itemGroup: FormGroup;
  searchForm: FormGroup;
  public loading = false;
  showEmpAssetsDetails = false
  selectedPRs = 0;
  @ViewChild('search') search: any;
  public PRsTemp: PurchasingRequestModel[] = [];
  public PRs: PurchasingRequestModel[] = [];
  public SelectedPRs: PurchasingRequestModel[] = [];
  public Items: ItemModel[] = [];
  public ItemsTemp: ItemModel[] = [];
  public ItemsCategory: ItemsCategoryModel[] = [];
  public Suppliers: SupplierModel[] = [];
  public Statuss: any[] = [];
 
  public columns: Array<object>;
  pageSize: number = 5;
  pageIndex: number = 1;
  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];

  date: Date = new Date();
  defaulProfiletImg: string;

    /////////////////////////////////////////////////////////////// constructor()  ngOnInit()  //////////////////////////////////////////////////////////////////////////
    constructor(
                private prSrv: PrService,
                private itmSrv: ItemService,
                private icSrv: ItemcategoryService,
                private shrdSrv: ShareddataService,
                private emlSrv: EmailService,
                private swalSrv: SweetalertService,
                private logSrv: LogsService,
                private expExcelSrv: ExportexcelService,
                private orderPipe: OrderPipe,
                private fb: FormBuilder,
                private alertService: AlertService,
                private modalService: BsModalService,
                private router: Router,
                private stgSrv: AppstorageService
      ) { 
        this.prForm = this.fb.group({
          PurchaseRequestId: null,
          prRemarks: [null, Validators.required],
          Items:  this.fb.array([]),
          userId: null,
          HD: false,
          OM: false,
          IT: false,
          GM: false
        });
    }
    ngOnInit() {
      this.onGetAllItems();
      this.onGetAllItemsCategorys();
      this.onGetAllPRs();
      this.onGetAllStatus();
      this.onGetemployeeRoles();
    }
    onGetAllItemsCategorys() {
      this.loading = true;
      this.icSrv.getAllItemsCategorys().subscribe((res: ItemsCategoryModel[]) => {  
              this.ItemsCategory = res;
              this.loading = false;
        }, error => {
              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger( 'server error');
              }
      });
    }
    onGetAllItems() {
            this.loading = true;
            this.itmSrv.getAllItems().subscribe((res: ItemModel[]) => {
                    this.Items = res;
                    this.ItemsTemp = res;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onGetAllPRs() {
      this.loading = true;
      this.prSrv.getPRsForUserListByEmpId().subscribe((res: PurchasingRequestModel[]) => {
              this.PRs = res;
              this.PRsTemp = res;
              this.loading = false;
              debugger;
        }, error => {

              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    onGetAllStatus(){
      this.prSrv.GetAllStatus().subscribe((stss: any[])=>{
          this.Statuss = stss;
      });
    }
    onGetemployeeRoles(){
    //  debugger;
      this.emp = this.stgSrv.getUserFromStorage();
      this.emp.rolesNames.forEach(r=>{
      //  debugger;
          if(r == "HeadDept"){
            this.emp.HD = true;
          } if(r == "IT"){
            this.emp.IT = true;
          } if(r == "Admin"){
            this.emp.HR = true;
          } if(r == "OfficeMngr"){
            this.emp.OM = true;
          } if(r == "GM"){
            this.emp.GM = true;
          }
      });
    }

    onSubmit() {
      //  debugger;
        this.loading = true;  
        this.getItemsGroup.value.forEach(element => {
       //   debugger;
          this.ItemsCategory.forEach(c=>{
            if (element.icId == c.icId){
                if(c.HD == true){ this.getHD.patchValue(true) };
                if(c.OM == true){ this.getOM.patchValue(true) };
                if(c.IT == true){ this.getIT.patchValue(true) };
                if(c.GM == true){ this.getGM.patchValue(true) };
            }
          });
        });
        if(this.prForm.controls.PurchaseRequestId.value == null){
          this.prSrv.addPR(this.prForm.value).subscribe(res=>{
            const control = <FormArray>this.prForm.controls['Items'];
            for(let i = 0 ; i <= control.length; i++)
            {
                control.removeAt(0);
            }
            this.prForm.reset();
            this.onGetAllPRs();
            this.alertService.success('PR Created Successfully');
          });
        } else {
          this.prSrv.editPR(this.prForm.value).subscribe(res=>{
            this.prForm.reset();
            this.prForm.controls.Items.setValue([]); 
            this.onGetAllPRs();
            this.alertService.success('PR Changed Successfully');
          });
        }

        this.loading = false;  
    }
    onCancel() {
      this.prForm.reset();
      this.getItemsGroup.patchValue([]);
    }
    addItem(itemCtl?, e?){
    //  debugger;

        let itemsCtlArr = <FormArray>this.prForm.controls.Items;
        itemsCtlArr.push(this.createItemGroup(itemCtl));
        this.prForm.value;
        
    }
    createItemGroup(itemCtl?): FormGroup{
   //   debugger;
      if(this.prForm.controls.PurchaseRequestId.value == null ){
 
        this.itemGroup = this.fb.group({
          icId: [null, Validators.required],
          icName: null,
          HD: false,
          OM: false,
          IT: false,
          GM: false,
          itmId: [null, Validators.required],
          itmName: null,
          itmQnt: [null, Validators.required],
        });
      } else {
        this.itemGroup = this.fb.group({
          icId: [itemCtl.icId, Validators.required],
          icName: itemCtl.icName,
          itmId: [itemCtl.itmId , Validators.required],
          itmName: itemCtl.itmName ,
          itmQnt: [itemCtl.ItmQntPR , Validators.required],
        });
      }
   //   debugger;
      return this.itemGroup;
    }
    selectItemCategoryEvent(itmCtl, event) {
    //  debugger;
      itmCtl.get('icId').setValue(event.icId);
      itmCtl.get('icName').setValue(event.icName);
      this.ItemsCategory.forEach(c=>{
        if (event.icId == c.icId){
            if(c.HD == true){ itmCtl.get('HD').setValue(true) };
            if(c.OM == true){ itmCtl.get('OM').setValue(true) };
            if(c.IT == true){ itmCtl.get('IT').setValue(true) };
            if(c.GM == true){ itmCtl.get('GM').setValue(true) };
        }
      });

      this.Items = [];
      this.ItemsTemp.forEach(itm => {
        if(itm.icId == event.icId){
          this.Items.push(itm);
        }      
      }); 
    }
    itemIsSelectedBefore = false;
    selectItemEvent(itmCtl, e) {
      

      this.getItemsGroup.value.forEach(item => {
        if(item.itmId == e.itmId) {    this.itemIsSelectedBefore = true;  itmCtl.get('itmId').setErrors({ 'valid': false });  };
      });
      if(!this.itemIsSelectedBefore){  
            itmCtl.get('itmId').setValue(e.itmId); 
      }
      
    }
    deleteItem(index) {
      let control = <FormArray>this.prForm.controls.Items;
      control.removeAt(index);
    }

    onEditPr(pr){
     // debugger;
       this.prForm.reset();
       this.prForm.get('Items').patchValue([{}]);
       this.prForm.patchValue(pr);
       pr.Items.forEach(itm => {
        this.addItem(itm);
       });
    }
    onCancelPr(pr){

    }
    onApprovePr(pr: PurchasingRequestModel){
      debugger;
      this.prSrv.onApprovePr(pr.PurchaseRequestId).subscribe(pr=>{
        debugger;
        this.onGetAllPRs();
      });
    }
    onRejectPr(pr){

    }


    setOrder(value: string) {
      // 
      if (this.order === value) {
        this.reverse = !this.reverse;
      }
  
      this.order = value;
    }
    onSort(event) {
      // console.log(event);
    }
    updateFilter(val: any) {
      // console.log(Object.keys(this.temp[0]).length);
      const value = val.toString().toLowerCase().trim();
      // get the amount of columns in the table
      const count = Object.keys(this.PRsTemp[0]).length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.PRsTemp[0]);
      // assign filtered matches to the active datatable
      this.PRs = this.PRsTemp.filter(item => {
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
      this.pageIndex = 1;
    }
    onSelectAll() {
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
      this.SelectedPRs = [];
      if(assetItemALLHTMLelemnt.checked) {
           this.PRs.forEach(val => { val.checkbox = true });
           this.PRs.forEach(emp => { this.SelectedPRs.push(emp) });
          //  this.onUpdatestatistics();
      } else if (!assetItemALLHTMLelemnt.checked) {
           this.PRs.forEach(val => { val.checkbox = false });
        //   this.onUpdatestatistics();
      }
    }
    onSelect(e, pRequest) {
      if(e.target.checked)
      {
        this.SelectedPRs.push(pRequest);
        let allChecked = true;
      //  this.onUpdatestatistics();
        this.PRs.forEach((asset, index) => {
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
        this.SelectedPRs.filter((pr, selectedIndex) => {
          if (pr.PurchaseRequestId === pRequest.PurchaseRequestId) {
            this.SelectedPRs.splice(selectedIndex, 1);
          //  this.onUpdatestatistics();
          }
        });
      }
      // console.log('Selected Employees:  ' ,  this.SelectedPRs);
      // console.log(' Employees:  ' ,  this.Employees);
      // 
    }
    onChangeRowsPerPage(event) {
      this.pageSize = event.target.value;
      this.pageIndex = 1;
    }
    searchFilter(filters: any): void {
      this.loading = true;
      this.prSrv.getPRsForUserListByEmpId().subscribe((prs: PurchasingRequestModel[]) => {
            
            this.PRs = [];
            this.PRs = prs;

            Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
            const keys = Object.keys(filters);
            const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
            const PRS = this.PRs.filter(filterEmps);
            this.PRs = PRS;
            this.loading = false;
           // this.onUpdatestatistics();
            this.pageIndex = 1;
      });
    }
    onFilterByStatus(e){
        this.PRs = [];
        this.PRsTemp.forEach(pr=>{
          if(pr.stsName == e.target.value)
             this.PRs.push(pr);
        })
    }

    get getPrForm() { return this.prForm.controls; }
    get getItemsGroup(){ return this.prForm.get('Items') as FormArray;  }

    get getHD() { return this.prForm.get('HD') as FormControl;  }
    get getOM() { return this.prForm.get('OM') as FormControl;  }
    get getIT() { return this.prForm.get('IT') as FormControl;  }
    get getGM() { return this.prForm.get('GM') as FormControl;  }

}
