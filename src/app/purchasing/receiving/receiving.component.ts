import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ReceivingModel } from 'app/shared/models/ReceivingModel';
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
//import { EmployeeModel } from 'app/shared/models/UserModel';
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
import { ReceivingService } from './service/receiving.service';
import { StoreModel } from 'app/shared/models/StoreModel';
import { StoreService } from '../store/service/store.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { DepartmentService } from 'app/masterdata/department/services/department.service';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {



  receivingForm: FormGroup;
 // itemGroup: FormGroup;
  searchForm: FormGroup;
  public loading = false;
  showEmpAssetsDetails = false
  selectedReceivings = 0;
  @ViewChild('search') search: any;
  public ReceivingsTemp: ReceivingModel[] = [];
  public Receivings: ReceivingModel[] = [];
  public POs: PurchasingOrderModel[] = [];
  public POsOpen: PurchasingOrderModel[] = [];
  // public PO: PurchasingOrderModel;
  public SelectedReceivings: ReceivingModel[] = [];
  public Item: ItemModel;
  public Items: ItemModel[] = [];
  public ItemsTemp: ItemModel[] = [];
  public Stores: StoreModel[] = [];
  public Employees: EmployeeModel[] = [];
  public Departments: DepartmentModel[] = [];
  public Branchs: BranchsModel[] = [];
  public Companys: CompanyModel[] = [];
  //public Suppliers: SupplierModel[] = [];
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
                private poSrv: PoService,
                private recSrv: ReceivingService,
                private itmSrv: ItemService,
                private strSrv : StoreService,
                private empSrv : EmployeeService,
                private dptSrv : DepartmentService,
                private brnSrv : BranchService,
                private comSrv : CompanyService,
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
        this.receivingForm = this.fb.group({
          ReceivingId: null,
          poRemarks: null,
          splName: null,
          ReceiveTo: ['', [Validators.required]] ,
          StoreId: null,
          EmployeeRecID: null,
          DptId: null,
          BrnId: null,
          ComId: null,
          EmpName: null,
          DptName: null,
          BrnName: null,
          ComName: null,
          strName: null,
          PurchaseOrderId: null,
          Items: this.fb.array([]),
          empId: null,
        });
    }
    ngOnInit() {
      this.onGetReceivingsByEmpId();
      this.onGetAllStors();
      this.onGetAllEmployees();
      this.onGetAllDepartments();
      this.onGetAllBranchs();
      this.onGetAllCompanys();
      this.getPOsListByEmpId();
      this.onGetReceivingsByEmpId();
    }

    onGetReceivingsByEmpId() {

      this.loading = true;
      this.recSrv.GetReceivingsByEmpId().subscribe((res: ReceivingModel[]) => {
              debugger;
              this.Receivings = res;
              this.ReceivingsTemp = res;
              this.loading = false;
        }, error => {
              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    // getPOsListByEmpId() {
    //   this.loading = true;
    //   this.poSrv.getPOsListByEmpId().subscribe((res: PurchasingOrderModel[]) => {
    //           this.POs = res;
    //           this.loading = false;
    //     }, error => {

    //           this.loading = false;
    //           if(error.message.includes('Http failure response for http://')) {
    //             this.alertService.danger('Server error ');
    //           }
    //   });
    // }
    getPOsListByEmpId() {
      this.loading = true;
      this.poSrv.getPOsListByEmpId().subscribe((res: PurchasingOrderModel[]) => {
              this.POsOpen = res;
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
         
          this.Stores = strs;
       });
    }
    onGetAllEmployees() {
      
      this.empSrv.getAllEmployees().subscribe((strs: EmployeeModel[]) => {
        
         this.Employees = strs;
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
    onGetAllCompanys() {
          
      this.comSrv.getAllCompanys().subscribe((strs: CompanyModel[]) => {
        this.Companys = strs;
      });
    }

    onChangeReceive(e){
      
      console.log(e.target.value);
      this.receivingForm.get('ReceiveTo').patchValue(e.target.value);
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

    public onFilterChange(item: any) {
      this.customSearchFn;
    }
    public onDropDownClose(item: any) {
    }

    public onPOsSlect(e) {
      
  
          console.log(e.target.value);
          this.poSrv.GetPOById(e.target.value).subscribe((po: PurchasingOrderModel)=>{
            debugger;
            if(po){
              this.receivingForm.get('PurchaseOrderId').patchValue(po.PurchaseOrderId);
              this.receivingForm.get('poRemarks').patchValue(po.poRemarks);
              this.receivingForm.get('splName').patchValue(po.splName);
              this.receivingForm.setControl('Items', this.fb.array([]));
              po.Items.forEach((i: ItemModel)=>{
                this.getItemsGroup.push(new FormControl(i));
                debugger;
              });
            }
          });
    }
    public onStoreSelect(e) {
      
      this.receivingForm.get('StoreId').patchValue(e.target.value);
      this.receivingForm.get('strName').patchValue(e.target.selectedOptions[0].text.toString());
      

    }
    public onEmployeeSelect(e) {
      this.receivingForm.get('DptName').patchValue(null);
      this.receivingForm.get('BrnName').patchValue(null);
      this.receivingForm.get('ComName').patchValue(null);

      this.receivingForm.get('EmployeeRecID').patchValue(e.target.value);
      this.receivingForm.get('EmpName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onDepartmentSelect(e) {
      this.receivingForm.get('EmpName').patchValue(null);
      this.receivingForm.get('BrnName').patchValue(null);
      this.receivingForm.get('ComName').patchValue(null);

      this.receivingForm.get('DptId').patchValue(e.target.value);
      this.receivingForm.get('DptName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onBranchSelect(e) {
      this.receivingForm.get('EmpName').patchValue(null);
      this.receivingForm.get('DptName').patchValue(null);
      this.receivingForm.get('ComName').patchValue(null);

      this.receivingForm.get('BrnId').patchValue(e.target.value);
      this.receivingForm.get('BrnName').patchValue(e.target.selectedOptions[0].text.toString());
    }
    public onCompanySelect(e) {
      this.receivingForm.get('EmpName').patchValue(null);
      this.receivingForm.get('BrnName').patchValue(null);
      this.receivingForm.get('DptName').patchValue(null);

      this.receivingForm.get('ComId').patchValue(e.target.value);
      this.receivingForm.get('ComName').patchValue(e.target.selectedOptions[0].text.toString());
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
       
        this.loading = true;  
        if(this.receivingForm.controls.ReceivingId.value == null){
          debugger;
          this.recSrv.addReceiving(this.receivingForm.value).subscribe(res=>{
            debugger;
            this.alertService.success('PR Created Successfully');
            this.receivingForm.reset();
            this.receivingForm.controls.Items.patchValue([]); 
            this.onGetReceivingsByEmpId();
         
          });
        } else {
          this.recSrv.editReceiving(this.receivingForm.value).subscribe(res=>{
            this.receivingForm.reset();
            this.receivingForm.controls.Items.patchValue([]); 
    
            this.alertService.success('PR Changed Successfully');
            this.onGetReceivingsByEmpId();
          });
        }

        this.onGetReceivingsByEmpId();
        this.loading = false;  
    }
    onCancel() {
      this.receivingForm.reset();
      // this.getPOsGroup.patchValue([]);
    }
    // addItem(itemCtl?, e?){
    //   

    //     let itemsCtlArr = <FormArray>this.receivingForm.controls.Items;
    //     itemsCtlArr.push(this.createItemGroup(itemCtl));
    //     this.receivingForm.value;
        
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
      

      // this.getPOsGroup.value.forEach(item => {
      //   if(item.itmId == e.itmId) {    this.itemIsSelectedBefore = true;  itmCtl.get('itmId').setErrors({ 'valid': false });  };
      // });
      if(!this.itemIsSelectedBefore){  
            itmCtl.get('itmId').setValue(e.itmId); 
      }
      
    }
    deleteItem(index) {
      let control = <FormArray>this.receivingForm.controls.Items;
      control.removeAt(index);
    }
    selectSupplierEvent(event) {
 
      this.receivingForm.controls['splId'].setValue(event.splId);
      this.receivingForm.controls['splName'].setValue(event.splName);
      
    }

    onEditPr(po){
      
       this.receivingForm.reset();
       this.receivingForm.get('Items').patchValue([{}]);
       this.receivingForm.patchValue(po);
       po.Items.forEach(itm => {
       // this.addItem(itm);
       });
    }
    onCancelPr(po){

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
      const count = Object.keys(this.ReceivingsTemp[0]).length;
      // get the key names of each column in the dataset
      const keys = Object.keys(this.ReceivingsTemp[0]);
      // assign filtered matches to the active datatable
      this.Receivings = this.ReceivingsTemp.filter(item => {
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
      this.SelectedReceivings = [];
      if(assetItemALLHTMLelemnt.checked) {
       //    this.Receivings.forEach(val => { val.checkbox = true });
           this.Receivings.forEach(emp => { this.SelectedReceivings.push(emp) });
          //  this.onUpdatestatistics();
      } else if (!assetItemALLHTMLelemnt.checked) {
       //    this.Receivings.forEach(val => { val.checkbox = false });
        //   this.onUpdatestatistics();
      }
    }
    onSelect(e, pRequest) {
      if(e.target.checked)
      {
        this.SelectedReceivings.push(pRequest);
        let allChecked = true;
      //  this.onUpdatestatistics();
        this.Receivings.forEach((asset, index) => {
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
        this.SelectedReceivings.filter((po, selectedIndex) => {
          if (po.ReceivingId === pRequest.ReceivingId) {
            this.SelectedReceivings.splice(selectedIndex, 1);
          //  this.onUpdatestatistics();
          }
        });
      }
      // console.log('Selected Employees:  ' ,  this.SelectedReceivings);
      // console.log(' Employees:  ' ,  this.Employees);
      // 
    }
    onChangeRowsPerPage(event) {
      this.pageSize = event.target.value;
      this.pageIndex = 1;
    }
    searchFilter(filters: any): void {
      this.loading = true;
      this.recSrv.getAllReceivings().subscribe((Receivings: ReceivingModel[]) => {
            
            this.Receivings = [];
            this.Receivings = Receivings;

            Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
            const keys = Object.keys(filters);
            const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
            const Pos = this.Receivings.filter(filterEmps);
            this.Receivings = Pos;
            this.loading = false;
           // this.onUpdatestatistics();
            this.pageIndex = 1;
      });
    }
    onFilterByStatus(e){
        this.Receivings = [];
        this.ReceivingsTemp.forEach(po=>{
          // if(po.stsName == e.target.value)
          //    this.Receivings.push(po);
        })
    }

     get getReceivingForm() { return this.receivingForm.controls; }
    // get getPOsGroup(){
    //   return this.receivingForm.get('PurchaseOrders') as FormArray;
    // }
    get getItemsGroup(){
      return this.receivingForm.get('Items') as FormArray;
    }
    get getReceiveTo() { return this.receivingForm.get('ReceiveTo') as FormControl; }

    get getEmpId() { return this.receivingForm.get('EmployeeRecID') as FormControl; }
    get getDptId() { return this.receivingForm.get('DptId') as FormControl; }
    get getBrnId() { return this.receivingForm.get('BrnId') as FormControl; }
    get getComId() { return this.receivingForm.get('ComId') as FormControl; }

    get getEmpName() { return this.receivingForm.get('EmpName') as FormControl; }
    get getDptName() { return this.receivingForm.get('DptName') as FormControl; }
    get getBrnName() { return this.receivingForm.get('BrnName') as FormControl; }
    get getComName() { return this.receivingForm.get('ComName') as FormControl; }



}
