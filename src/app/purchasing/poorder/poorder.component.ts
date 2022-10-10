import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { PurchasingOrderModel } from 'app/shared/models/PurchaseOrderModel';
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
import { PoService } from './service/po.service';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { ItemService } from '../item/service/item.service';
import { SupplierService } from 'app/masterdata/supplier/service/supplier.service';
import { PurchasingRequestModel } from 'app/shared/models/PurchaseRequestmodel';
import { PrService } from '../prrequest/service/pr.service';

@Component({
  selector: 'app-poorder',
  templateUrl: './poorder.component.html',
  styleUrls: ['./poorder.component.css']
})
export class PoorderComponent implements OnInit {


  poForm: FormGroup;
 // itemGroup: FormGroup;
  searchForm: FormGroup;
  public loading = false;
  showEmpAssetsDetails = false
  selectedPOs = 0;
  @ViewChild('search') search: any;
  public POsTemp: PurchasingOrderModel[] = [];
  public POs: PurchasingOrderModel[] = [];
  public PRs: PurchasingRequestModel[] = [];
  public SelectedPOs: PurchasingOrderModel[] = [];
  public Item: ItemModel;
  public Items: ItemModel[] = [];
  public ItemsTemp: ItemModel[] = [];
  public ItemsCategory: ItemsCategoryModel[] = [];
  public Suppliers: SupplierModel[] = [];
  public Statuss: any[] = [];
 
  public settings = {};

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
                private POsrv: PoService,
                private prSrv: PrService,
                private itmSrv: ItemService,
                private spltSrv : SupplierService,
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
                private router: Router
      ) { 
        this.poForm = this.fb.group({
          PurchaseOrderId: null,
          poRemarks: [null, Validators.required],
          splId: null,
          splName: null,
          PurchaseRequestes:  this.fb.array([]),
          Items: this.fb.array([]),
          poTotalAmount: null,
          userId: null,
          HD: false,
          OM: false,
          IT: false,
          GM: false
        });

        this.searchForm = this.fb.group({
          Status: null
        })
    }
    ngOnInit() {
      this.settings = {
        singleSelection: false,
        idField: 'PurchaseRequestId',
        textField: "prRemarks",
        enableCheckAll: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        limitSelection: -1,
        clearSearchFilter: true,
        maxHeight: 197,
        itemsShowLimit: 6,
        searchPlaceholderText: 'Search by remarks or requester',
        noDataAvailablePlaceholderText: 'No Data Available',
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: false,
        defaultOpen: false
      };
      this.onGetAllItems();
      this.onGetAllItemsCategorys();
      this.getPOsListByEmpId();
      this.GetPRsForPOsByEmpId();
      this.onGetAllStatus();
      this.onGetAllSuppliers();
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
    getPOsListByEmpId() {
      this.loading = true;
      this.POsrv.getPOsListByEmpId().subscribe((res: PurchasingOrderModel[]) => {
              this.POs = res;
              this.POsTemp = res;          
              this.loading = false;
              debugger;
        }, error => {

              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    GetPRsForPOsByEmpId() {
      this.loading = true;
      this.POsrv.GetPRsForPOsByEmpId().subscribe((res: PurchasingRequestModel[]) => {
              this.PRs = res;
              this.loading = false;
        }, error => {

              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    onGetAllStatus(){
      this.POsrv.GetAllStatus().subscribe((stss: any[])=>{
          this.Statuss = stss;
      });
    }
    onGetAllSuppliers() {
       this.spltSrv.getAllSuppliers().subscribe((spls: SupplierModel[]) => {
          this.Suppliers = spls;
       });
    }

    public onFilterChange(item: any) {
      this.customSearchFn;
    }
    public onDropDownClose(item: any) {
    }

    public onPRSelect(pr?: PurchasingRequestModel) {
      debugger
        this.prSrv.GetPRById(pr.PurchaseRequestId).subscribe((p: PurchasingRequestModel) =>{
          this.getPRsGroup.push(new FormControl(p));
          debugger
          p.Items.forEach((i: ItemModel)=>{
            if(this.getItemsGroup.length == 0){
              i.ItmQntPO += i.ItmQntPR;
              i.itmTotalPricePO = i.ItmQntPO * i.itmPrice;
              this.getItemsGroup.push(new FormControl(i));
            } else {
              let itmsCtl = <FormArray>this.poForm.controls.Items;
              let exist = false;
              itmsCtl.value.forEach(rec => {
                if(i.itmId == rec.itmId){
                  exist = true;
                  rec.ItmQntPO += i.ItmQntPR;
                  rec.itmTotalPricePO = rec.ItmQntPO * i.itmPrice;
                };
              });
              if(!exist){
                i.ItmQntPO += i.ItmQntPR;
                i.itmTotalPricePO = i.ItmQntPO * i.itmPrice;
                this.getItemsGroup.push(new FormControl(i));
              };
            };
          });
          this.poForm.get('poTotalAmount').patchValue(0);
          let totalPoAmount: number = 0;
          let itemsCtl = <FormArray>this.poForm.controls.Items;
          debugger
          itemsCtl.value.forEach((item: ItemModel) => {
            debugger
            totalPoAmount += item.itmTotalPricePO;
            this.poForm.get('poTotalAmount').patchValue(totalPoAmount);
            debugger
          });
       });
    }

    createItemGroup(itm?: ItemModel){
      
      if(this.poForm.controls.PurchaseOrderId.value == null ){
        this.Item = {
          icId: null,
          icName: null,
          itmId: null, 
          itmName: null,
          ItmQntPR: null, 
        };
      } else {
        this.Item = {
          icId: null,
          icName: null,
          itmId: null, 
          itmName: null,
          ItmQntPR: null, 
        };
      }
      
      return this.Item;
    }
    public onDeSelect(prs: any) {
       this.getPRsGroup.removeAt(prs);
    }
    public onSelectAllPRs(prs: any) {
      debugger
      prs.forEach(pr => {
        this.getPRsGroup.push(this.createPrGroup(pr));
      });
    }
    onDeSelectAll(items?: any) {
        this.getPRsGroup.value.forEach(itm => {
              this.getPRsGroup.removeAt(itm);
        });
    }
    createPrGroup(pr?: PurchasingRequestModel): FormGroup {
      return this.fb.group({
        PurchaseRequestId: pr.PurchaseRequestId,
        prRemarks: pr.prRemarks,
        RequesterRemarkItems: pr.RequesterRemarkItems,
        EmployeeId: this.PRs.find(x => x.empId === pr.empId).empId,
        EmployeeName: this.PRs.find(x => x.empId === pr.empId).accountName
      });
    }
   
    customSearchFn(term: string, item: any) {
      term = term.toLocaleLowerCase();
      return item.prRemarks.toLocaleLowerCase().indexOf(term) > -1 || 
      item.prRemarks.toLocaleLowerCase().indexOf(term) > -1;
    }

    onSubmit() {
      debugger;
        this.loading = true;  
        if(this.poForm.controls.PurchaseOrderId.value == null){
          this.POsrv.addPO(this.poForm.value).subscribe(res=>{
            debugger;
            const control1 = <FormArray>this.poForm.controls['PurchaseRequestes'];
            control1.reset();
            for(let i = 0 ; i <= control1.length; i++)
            {
             // this.getPRsGroup.removeAt(i);
                control1.removeAt(i);
            }
            const control = <FormArray>this.poForm.controls['Items'];
            for(let i = 0 ; i <= control.length; i++)
            {
                control.removeAt(0);
            }
            this.poForm.reset();
            this.alertService.success('PO Created Successfully');
            window.location.reload();
            this.getPOsListByEmpId();
            
            debugger;
          });
        } else {
          this.POsrv.editPO(this.poForm.value).subscribe(res=>{
            this.poForm.reset();
            this.poForm.controls.Items.patchValue([]); 
            this.getPOsListByEmpId();
            this.alertService.success('PO Changed Successfully');
          });
        }

      
        this.loading = false;  
    }
    onCancel() {
      this.poForm.reset();
      this.getPRsGroup.patchValue([]);
    }
    // addItem(itemCtl?, e?){
    //   

    //     let itemsCtlArr = <FormArray>this.poForm.controls.Items;
    //     itemsCtlArr.push(this.createItemGroup(itemCtl));
    //     this.poForm.value;
        
    // }

    selectItemCategoryEvent(itmCtl, event) {
   
      itmCtl.get('icId').setValue(event.icId);
      itmCtl.get('icName').setValue(event.icName);
      this.Items = [];
      this.ItemsTemp.forEach(itm => {
        
        if(itm.icId == event.icId){
          this.Items.push(itm);
        }      
      });
      
    }
    itemIsSelectedBefore = false;
    selectItemEvent(itmCtl, e) {
      

      this.getPRsGroup.value.forEach(item => {
        if(item.itmId == e.itmId) {    this.itemIsSelectedBefore = true;  itmCtl.get('itmId').setErrors({ 'valid': false });  };
      });
      if(!this.itemIsSelectedBefore){  
            itmCtl.get('itmId').setValue(e.itmId); 
      }
      
    }
    deleteItem(index) {
      let control = <FormArray>this.poForm.controls.Items;
      control.removeAt(index);
    }
    selectSupplierEvent(event) {
 
      this.poForm.controls['splId'].setValue(event.splId);
      this.poForm.controls['splName'].setValue(event.splName);
      
    }

    onEditPr(pr){
      
       this.poForm.reset();
       this.poForm.get('Items').patchValue([{}]);
       this.poForm.patchValue(pr);
       pr.Items.forEach(itm => {
       // this.addItem(itm);
       });
    }
    onCancelPr(pr){

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
      const count = Object.keys(this.POsTemp[0]).length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.POsTemp[0]);
      // assign filtered matches to the active datatable
      this.POs = this.POsTemp.filter(item => {
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
      this.SelectedPOs = [];
      if(assetItemALLHTMLelemnt.checked) {
           this.POs.forEach(val => { val.checkbox = true });
           this.POs.forEach(emp => { this.SelectedPOs.push(emp) });
          //  this.onUpdatestatistics();
      } else if (!assetItemALLHTMLelemnt.checked) {
           this.POs.forEach(val => { val.checkbox = false });
        //   this.onUpdatestatistics();
      }
    }
    onSelect(e, pRequest) {
      if(e.target.checked)
      {
        this.SelectedPOs.push(pRequest);
        let allChecked = true;
      //  this.onUpdatestatistics();
        this.POs.forEach((asset, index) => {
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
        this.SelectedPOs.filter((pr, selectedIndex) => {
          if (pr.PurchaseOrderId === pRequest.PurchaseOrderId) {
            this.SelectedPOs.splice(selectedIndex, 1);
          //  this.onUpdatestatistics();
          }
        });
      }
      // console.log('Selected Employees:  ' ,  this.SelectedPOs);
      // console.log(' Employees:  ' ,  this.Employees);
      // 
    }
    onChangeRowsPerPage(event) {
      this.pageSize = event.target.value;
      this.pageIndex = 1;
    }
    searchFilter(filters: any): void {
      this.loading = true;
      this.POsrv.getPOsListByEmpId().subscribe((POs: PurchasingOrderModel[]) => {
            
            this.POs = [];
            this.POs = POs;

            Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
            const keys = Object.keys(filters);
            const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
            const Pos = this.POs.filter(filterEmps);
            this.POs = Pos;
            this.loading = false;
           // this.onUpdatestatistics();
            this.pageIndex = 1;
      });
    }
    onFilterByStatus(e){
        this.POs = [];
        this.POsTemp.forEach(pr=>{
          if(pr.stsName == e.target.value)
             this.POs.push(pr);
        })
    }

    get getpoForm() { return this.poForm.controls; }
    get getPRsGroup(){
      return this.poForm.get('PurchaseRequestes') as FormArray;
    }
    get getItemsGroup(){
      return this.poForm.get('Items') as FormArray;
    }
    get getSupplierName() { return this.poForm.get('splName') as FormControl; }


}
