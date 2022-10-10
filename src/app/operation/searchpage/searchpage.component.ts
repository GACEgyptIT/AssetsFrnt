import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { InvoicesModel } from 'app/shared/models/InvoicesModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from 'app/masterdata/supplier/service/supplier.service';
import { CostcenterService } from 'app/masterdata/costcenter/Services/costcenter.service';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { InvoicemngService } from '../invoicemng/service/invoicemng.service';
import { FileService } from 'app/shared/services/downloadfile.service';
import { Router } from '@angular/router';
import { SweetalertService } from 'app/sweetalert.service';
import { AlertService } from 'ngx-alerts';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { CostCenterModel } from 'app/shared/models/CostCenterModel';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent  {

//   mySearchKeyWord

//   invoiceForm: FormGroup;

//   form: FormGroup;
//   public ItemsCategorys: ItemsCategoryModel[] = [];
//   public CostCenters: CostCenterModel[] = [];
//   public SelectedInvoices: InvoicesModel[] = [];
//   public Invoices: InvoicesModel[] = [];
//   public TempInvoices: InvoicesModel[] = [];
//   pageIndex: number = 1;
//   pageSize: number = 10;
//   public loading = false;
//   showStatistics = false;
//   order: string = "info.name";
//   reverse: boolean = false;
//   sortedCollection: any[];

  
//   @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
//   @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();

//   minDate: Date = new Date('01.01.2019');
//   maxDate: Date = new Date();
//   currentDate: Date = new Date();
//   fromDate: Date  = new Date();
//   toDate: Date = new Date();

//   usr: UserModel;

//   constructor(
//     private sharedDataSrv: ShareddataService,
//     private strSrv: AppstorageService,
//     private sanitizer: DomSanitizer,
//     private http: HttpClient,
//     private spltSrv : SupplierService,
//     private ccSrv: CostcenterService,
//     private icSrv: ItemcategoryService,
//     private invSrv: InvoicemngService,
//     private fileService: FileService,
//     private router: Router,
//     private swalSrv: SweetalertService,
//     private alertService: AlertService,
//     private fb: FormBuilder,
//     private expExcelSrv: ExportexcelService

//   ) {

//     this.onGetAllInvoices();
//     this.onGetAllItemsCategorys();
//     this.onGetAllCostCenters();
//    }

//   ngOnInit(): void {
//     this.buildForm();
//   }

//   onGetAllInvoices() {
//     this.Invoices = [];
//     this.TempInvoices = [];
//     this.loading = true;
//     this.invSrv.getAllInvoices().subscribe((invs: InvoicesModel[]) => {
//              invs.forEach(inv=>{  
//                    this.Invoices.push(inv);
//                    this.TempInvoices.push(inv);
//            });
//            this.loading = false;

//     }, err=>{
//      this.alertService.danger('Server Error');
//      this.loading = false;
//     });
 
//   }
//   onGetAllCostCenters() {
//     this.ccSrv.getAllCostCenters().subscribe((ccs: CostCenterModel[]) => {
//          this.CostCenters = ccs;
//     });
//  }
//  onGetAllItemsCategorys() {
//     this.icSrv.getAllItemsCategorys().subscribe((ics: ItemsCategoryModel[]) => {
//        this.ItemsCategorys = ics;
//     });
//  }

//  buildForm(): void {
//   this.form = this.fb.group({
//     invNumber: new FormControl(''),
//     invAmount: new FormControl(''),
//     invStatus: new FormControl(''),
//     ItemCategoryName: new FormControl(''),
//     CostCenterName: new FormControl('')
//   });
//  }

//   search(filters: any[]): void {
//     Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
//     this.filterUserList(filters);
//   }

//   filterUserList(filters: any): void {
//     this.TempInvoices = this.Invoices;     //Reset User List
//     const keys = Object.keys(filters);
//     keys.forEach(k=> console.log(k))
//     const filterUser = user => keys.every(key => user[key] === filters[key]);
//     this.TempInvoices = this.Invoices.filter(filterUser);
//   }
}
