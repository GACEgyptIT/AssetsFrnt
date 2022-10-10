import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { TransferModel } from 'app/shared/models/TransferModel';
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
//import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { EmailService } from 'app/shared/services/email.service';
import { ADArchiveAccModel } from 'app/shared/models/ADArchiveAccModel';
import { AssetModel } from 'app/shared/models/AssetModel';
import { LogsService } from 'app/shared/services/logs.service';
import { ShareddataService } from 'app/shared/services/shareddata.service';
//import { PoService } from './service/po.service';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { ItemService } from '../item/service/item.service';
import { SupplierService } from 'app/masterdata/supplier/service/supplier.service';
import { PurchasingOrderModel } from 'app/shared/models/PurchaseOrderModel';
//import { POservice } from '../prrequest/service/po.service';
import { PoService } from '../poorder/service/po.service';
import { TransferService } from './service/transfer.service';
import { StoreModel } from 'app/shared/models/StoreModel';
import { StoreService } from '../store/service/store.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { DepartmentService } from 'app/masterdata/department/services/department.service';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {



  transferForm: FormGroup;
  searchForm: FormGroup;
  public loading = false;
  showEmpAssetsDetails = false
  selectedTransfers = 0;
  @ViewChild('search') search: any;
  public TransfersTemp: TransferModel[] = [];
  public Transfers: TransferModel[] = [];
  public POs: PurchasingOrderModel[] = [];
  public SelectedTransfers: TransferModel[] = [];
  public Item: ItemModel;
  public Items: ItemModel[] = [];
  public ItemsTemp: ItemModel[] = [];
  public ToStores: StoreModel[] = [];
  public FromStores: StoreModel[] = [];
  public FromStore: StoreModel;
  public Employees: EmployeeModel[] = [];
  public Departments: DepartmentModel[] = [];
  public Branchs: BranchsModel[] = [];
  public Companys: CompanyModel[] = [];
  public Suppliers: SupplierModel[] = [];
 
 
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
                private poSrv: PoService,
                private recSrv: TransferService,
                private itmSrv: ItemService,
                private empSrv: EmployeeService,
                private dptSrv: DepartmentService,
                private brnSrv: BranchService,
                private comSrv: CompanyService,
                private strSrv : StoreService,
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
        this.transferForm = this.fb.group({
          TransferId: null,
          itmId: null,
          itmName: null,
          itmQnt: null,
          Price: null,
          ReceiveTo: ['', [Validators.required]] ,
          FromStoreId: null,
          ToStoreId: null,
          FromStoreName: null,
          ToStoreName: null,
          EmpId: null,
          DptId: null,
          BrnId: null,
          ComId: null,
          EmpName: null,
          DptName: null,
          BrnName: null,
          ComName: null,
        //  strName: null,
          userId: null,
        });
    }
    ngOnInit() {
      this.onGetAllTransfers();
      this.onGetAllItems();
      this.onGetAllStors();
      this.onGetAllEmployees();
      this.onGetAllDepartments();
      this.onGetAllBranchs();
      this.onGetAllCompanys();
    }

    onGetAllTransfers() {

      this.loading = true;
      this.recSrv.getAllTransfers().subscribe((res: TransferModel[]) => {
              debugger;
              this.Transfers = res;
              this.TransfersTemp = res;
              this.loading = false;
        }, error => {
              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    onGetAllItems() {
      
      this.loading = true;
      this.itmSrv.getAllItems().subscribe((res: ItemModel[]) => {
        debugger;
              this.Items = res;
              this.loading = false;
        }, error => {

              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    onGetAllStors() {
      
       this.strSrv.getAllStores().subscribe((strs: StoreModel[]) => {
        //   debugger;
          this.FromStores = strs;
          this.ToStores = strs;
       });
    }

    onGetAllDepartments() {
      this.dptSrv.getAllDepartments().subscribe((strs: DepartmentModel[]) => {
   
         this.Departments = strs;
      });
    }
    onGetAllBranchs() {    
    this.brnSrv.getAllBranchs().subscribe((strs: BranchsModel[]) => {

       this.Branchs = strs;
    });
    }
    onGetAllEmployees() {
    this.empSrv.getAllEmployees().subscribe((strs: EmployeeModel[]) => {
  
      this.Employees = strs;
    });
    }
    onGetAllCompanys() {
    this.comSrv.getAllCompanys().subscribe((strs: CompanyModel[]) => {
     
      this.Companys = strs;
    });
    }

    public onFilterChange(item: any) {
      this.customSearchFn;
    }
    public onDropDownClose(item: any) {
    }

    public onItemSlect(e) {
          this.FromStore = {};
          console.log(e.target.value);
          this.itmSrv.getItemById(e.target.value).subscribe((itm: ItemModel)=>{
            debugger;
            if(itm){
              this.transferForm.get('itmId').patchValue(itm.itmId);
              this.transferForm.get('itmName').patchValue(itm.itmName);
              this.transferForm.get('Price').patchValue(itm.itmPrice);
              this.Item = itm;
              this.FromStores = [];
              this.ToStores.forEach(str=>{
                itm.Stores.forEach((s:StoreModel)=>{
                  debugger;
                   if(s.strName == str.strName){
                    this.FromStores.push(s);
                   }
                });
                });
              }
          });
    }
    public onFromStoreSelect(e) {     
      debugger;
      console.log(e.target.selectedOptions[0].value);
        this.transferForm.get('FromStoreId').patchValue(e.target.value);
        this.transferForm.get('FromStoreName').patchValue(e.target.selectedOptions[0].text.toString());
        this.FromStore = {};
        this.FromStores.forEach(str=>{
            if(str.strName == e.target.selectedOptions[0].text.toString()){
              this.FromStore = str;
            }
        });
    }
    public onToStoreSelect(e) {
debugger;
      this.transferForm.get('ToStoreId').patchValue(e.target.value);
      this.transferForm.get('ToStoreName').patchValue(e.target.selectedOptions[0].text.toString());
      
    }

    createPrGroup(po?: PurchasingOrderModel): FormGroup {
      return this.fb.group({
        // PurchaseRequestId: po.PurchaseRequestId,
        // prRemarks: po.prRemarks,
        // RequesterRemarkItems: po.RequesterRemarkItems,
        // EmployeeId: this.POs.find(x => x.usrId === po.usrId).usrId,
        // EmployeeName: this.POs.find(x => x.usrId === po.usrId).usrName
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
        if(this.transferForm.controls.TransferId.value == null){
          this.recSrv.addTransfer(this.transferForm.value).subscribe(res=>{

            this.onGetAllTransfers();
            this.alertService.success('PR Created Successfully');
            this.transferForm.reset();
            this.transferForm.controls.Items.setValue([]); 

          });
        } else {
          this.recSrv.editTransfer(this.transferForm.value).subscribe(res=>{
            this.transferForm.reset();
            this.transferForm.controls.Items.setValue([]); 
            this.onGetAllTransfers();
            this.alertService.success('PR Changed Successfully');
          });
        }

        this.onGetAllTransfers();
        this.loading = false;  
    }
    onCancel() {
      this.transferForm.reset();
      // this.getPOsGroup.patchValue([]);
    }

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
      

      // this.getPOsGroup.value.forEach(item => {
      //   if(item.itmId == e.itmId) {    this.itemIsSelectedBefore = true;  itmCtl.get('itmId').setErrors({ 'valid': false });  };
      // });
      if(!this.itemIsSelectedBefore){  
            itmCtl.get('itmId').setValue(e.itmId); 
      }
      
    }
    deleteItem(index) {
      let control = <FormArray>this.transferForm.controls.Items;
      control.removeAt(index);
    }
    selectSupplierEvent(event) {
 
      this.transferForm.controls['splId'].setValue(event.splId);
      this.transferForm.controls['splName'].setValue(event.splName);
      
    }

    onEditPr(po){
      
       this.transferForm.reset();
       this.transferForm.get('Items').patchValue([{}]);
       this.transferForm.patchValue(po);
       po.Items.forEach(itm => {
       // this.addItem(itm);
       });
    }
    onCancelPr(po){

    }
    onChangeReceive(e){
      
      console.log(e.target.value);
      this.transferForm.get('ReceiveTo').patchValue(e.target.value);
      
      }
      
          onChangeReceiveTo(e){
            
      
            this.getEmpId.setValue(null);
            this.getDptId.setValue(null);
            this.getBrnId.setValue(null);
            this.getComId.setValue(null);
      
                if(e.target.value == "Employee"){
                  this.getEmpId.setValue(0);
                }   if(e.target.value == "Department"){
                  this.getDptId.setValue(0);
                }   if(e.target.value == "Branch"){
                  this.getBrnId.setValue(0);
                }   if(e.target.value == "Company"){
                  this.getComId.setValue(0);
                }
          }
    public onEmployeeSelect(e) {
      this.transferForm.get('DptName').patchValue(null);
      this.transferForm.get('BrnName').patchValue(null);
      this.transferForm.get('ComName').patchValue(null);

      this.transferForm.get('EmpId').patchValue(e.target.value);
      this.transferForm.get('EmpName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onDepartmentSelect(e) {
      this.transferForm.get('EmpName').patchValue(null);
      this.transferForm.get('BrnName').patchValue(null);
      this.transferForm.get('ComName').patchValue(null);

      this.transferForm.get('DptId').patchValue(e.target.value);
      this.transferForm.get('DptName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onBranchSelect(e) {
      this.transferForm.get('EmpName').patchValue(null);
      this.transferForm.get('DptName').patchValue(null);
      this.transferForm.get('ComName').patchValue(null);

      this.transferForm.get('BrnId').patchValue(e.target.value);
      this.transferForm.get('BrnName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onCompanySelect(e) {
      this.transferForm.get('EmpName').patchValue(null);
      this.transferForm.get('BrnName').patchValue(null);
      this.transferForm.get('DptName').patchValue(null);

      this.transferForm.get('ComId').patchValue(e.target.value);
      this.transferForm.get('ComName').patchValue(e.target.selectedOptions[0].text.toString());
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
      const count = Object.keys(this.TransfersTemp[0]).length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.TransfersTemp[0]);
      // assign filtered matches to the active datatable
      this.Transfers = this.TransfersTemp.filter(item => {
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
      this.SelectedTransfers = [];
      if(assetItemALLHTMLelemnt.checked) {
       //    this.Transfers.forEach(val => { val.checkbox = true });
           this.Transfers.forEach(emp => { this.SelectedTransfers.push(emp) });
          //  this.onUpdatestatistics();
      } else if (!assetItemALLHTMLelemnt.checked) {
       //    this.Transfers.forEach(val => { val.checkbox = false });
        //   this.onUpdatestatistics();
      }
    }
    onSelect(e, pRequest) {
      if(e.target.checked)
      {
        this.SelectedTransfers.push(pRequest);
        let allChecked = true;
      //  this.onUpdatestatistics();
        this.Transfers.forEach((asset, index) => {
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
        this.SelectedTransfers.filter((po, selectedIndex) => {
          if (po.TransferId === pRequest.TransferId) {
            this.SelectedTransfers.splice(selectedIndex, 1);
          //  this.onUpdatestatistics();
          }
        });
      }
      // console.log('Selected Employees:  ' ,  this.SelectedTransfers);
      // console.log(' Employees:  ' ,  this.Employees);
      // 
    }
    onChangeRowsPerPage(event) {
      this.pageSize = event.target.value;
      this.pageIndex = 1;
    }
    searchFilter(filters: any): void {
      this.loading = true;
      this.recSrv.getAllTransfers().subscribe((Transfers: TransferModel[]) => {
            
            this.Transfers = [];
            this.Transfers = Transfers;

            Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
            const keys = Object.keys(filters);
            const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
            const Pos = this.Transfers.filter(filterEmps);
            this.Transfers = Pos;
            this.loading = false;
           // this.onUpdatestatistics();
            this.pageIndex = 1;
      });
    }
    onFilterByStatus(e){
        this.Transfers = [];
        this.TransfersTemp.forEach(po=>{
          // if(po.stsName == e.target.value)
          //    this.Transfers.push(po);
        })
    }

     get getTransferForm() { return this.transferForm.controls; }

    get getItemsGroup(){
      return this.transferForm.get('Items') as FormArray;
    }
    get getReceiveTo() { return this.transferForm.get('ReceiveTo') as FormControl; }

    get getEmpId() { return this.transferForm.get('EmpId') as FormControl; }
    get getDptId() { return this.transferForm.get('DptId') as FormControl; }
    get getBrnId() { return this.transferForm.get('BrnId') as FormControl; }
    get getComId() { return this.transferForm.get('ComId') as FormControl; }

    get getEmpName() { return this.transferForm.get('EmpName') as FormControl; }
    get getDptName() { return this.transferForm.get('DptName') as FormControl; }
    get getBrnName() { return this.transferForm.get('BrnName') as FormControl; }
    get getComName() { return this.transferForm.get('ComName') as FormControl; }


}
