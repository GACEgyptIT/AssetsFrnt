import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupplierService } from 'app/masterdata/supplier/service/supplier.service';
import { CostcenterService } from 'app/masterdata/costcenter/Services/costcenter.service';
import { FileService } from 'app/shared/services/downloadfile.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { SweetalertService } from 'app/sweetalert.service';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { CostCenterModel } from 'app/shared/models/CostCenterModel';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { InvoicemngService } from '../service/invoicemng.service';
import { InvoicesModel } from 'app/shared/models/InvoicesModel';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { AuthService } from 'app/shared/authentication/service/auth.service';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';

import { LegendItemMonth, LbdChartMonthComponent , ChartTypeMonth } from './lbd-chartMonths/lbd-chartMonth.component';     
import { LegendItemBranch, LbdChartBranchComponent, ChartTypeBranch } from './lbd-chartBranchs/lbd-chartBranch.component';   
import { now } from 'moment';


@Component({
  providers: [ LbdChartMonthComponent, LbdChartBranchComponent ],
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnChanges   {

  // public activityChartBy: ChartBy;
  public activityChartTypeMonth: ChartTypeMonth;
  public activityChartTypeBranch: ChartTypeBranch;
  public activityChartDataForMonths: any;
  public activityChartDataForBranchs: {labels: any[], series: any[]};
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItemsMonth: LegendItemMonth[];
  public activityChartLegendItemsBranchs: LegendItemBranch[];

  ////////////////////

  InvDateNgModel = "";

  TotalInvoicesAmount=0;

  totalLaptops = 0; totalDesktops = 0 ;  totalMobiles = 0; totalInvoices = 0; totalScreens = 0; totalPrinters = 0; totalServers = 0;  
  totalDataLines = 0; selectedInvoices =0; noCompany = 0; noBranch = 0; noEmployee = 0; totalVoiceLines=0; noAssetType=0;

  invoiceForm: FormGroup;
  filterByMonthForm: FormGroup;
  filterByBranchForm: FormGroup;
  public CostCenters: CostCenterModel[] = [];
  public Suppliers: SupplierModel[] = [];
  public ItemsCategorys: ItemsCategoryModel[] = [];
  public SelectedInvoices: InvoicesModel[] = [];
  public InvoicesMonths: InvoicesModel[] = [];
  public TempInvoicesMonths: InvoicesModel[] = [];
  public InvoicesBranches: InvoicesModel[] = [];
  public TempInvoicesBranches: InvoicesModel[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  public loading = false;
  showStatistics = false;
  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];
  @ViewChild('search') search: any;

  minDate: Date = new Date('01.01.2019');
  maxDate: Date = new Date();
  currentDate: Date = new Date();
  dateFrom: Date = new Date('01.01.2021');
  dateTo: Date = new Date();
  FromDateString = '';
  ToDateString = '';

  usr: EmployeeModel;
  totalByCC = 0;


  constructor(
    private sharedDataSrv: ShareddataService,
    private strSrv: AppstorageService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private spltSrv : SupplierService,
    private ccSrv: CostcenterService,
    private icSrv: ItemcategoryService,
    private invSrv: InvoicemngService,
    private fileService: FileService,
    private router: Router,
    private swalSrv: SweetalertService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private expExcelSrv: ExportexcelService
  ) { 
    this.invoiceForm = this.fb.group({
      InvoiceId: null,
      invNumber:  [null, Validators.required],
      invAmount:  [null, Validators.required],
      invDate: [this.currentDate, Validators.required],
      Remarks: null,
      InvFile: null,
      invStatus: ['Paid', Validators.required],
      ItemsCategoryName: null,
      CostCenterName: null,
      SupplierName: null,
      splId: [null, Validators.required],
      CostCenterId:  [null, Validators.required],
      icId: [0, Validators.required],
    });
    this.onGetAllItemsCategorys();
    this.onGetAllCostCenters();
    this.onGetAllSuppliers();
    this.onGetAllInvoices();

  }

  ngOnInit(){
    this.buildFilterByBranchForm();
    this.buildFilterbyMonthForm();
    this.loadChartMonths();
    this.loadChartBranchs();
    this.setOneMonthDate();
  }
  ngOnChanges() {
  }

  loadChartMonths(records?: any[]){
   
    this.activityChartTypeMonth = ChartTypeMonth.Bar;

    this.activityChartDataForMonths = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', ' Sept', ' Oct', ' Nov', ' Dec', '-', 'Total'],
      series: records
    };
    debugger;
    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    let cat1 = 'No-Info';
    let cat2 = 'No-Info';
    let cat3 = 'No-Info';
    let cat4 = 'No-Info';

    if(records != undefined && records[0] != null){ cat1 = records[0][12]; }
    if(records != undefined && records[1] != null){ cat2 = records[1][12]; }
    if(records != undefined && records[2] != null){ cat3 = records[2][12]; }
    if(records != undefined && records[3] != null){ cat4 = records[3][12]; }
    
    this.activityChartLegendItemsMonth = [
      { title: cat1, imageClass: 'fa fa-circle text-info' },
      { title: cat2, imageClass: 'fa fa-circle text-danger' },
      { title: cat3, imageClass: 'fa fa-circle text-warning' },
      { title: cat4, imageClass: 'fa fa-circle color-purple' }
      // color:#800080
    ];
  }
  loadChartBranchs(records?){
    debugger;
    let cat1 = 'No Info';
    let cat2 = 'No-Info';
    let cat3 = 'No-Info';
     this.activityChartTypeBranch = ChartTypeBranch.Bar;
     this.activityChartDataForBranchs = {
      labels: [],
      series: [
        // [10,10],
        // [20,20],
        // [30,30]
      ]
     };
     if(records != undefined){
      records.forEach((rec, index) => {
        
        if(!this.activityChartDataForBranchs.labels.includes(rec.ccName)){
          this.activityChartDataForBranchs.labels.push(rec.ccName);
        }
      });
     }
     this.totalByCC = 0;
      this.activityChartDataForBranchs.labels.forEach((cc, index) => {
          var srs = [];
        
          records.forEach((rec, iCat)=>{
            debugger;
            cat1 = rec.catName;
            if(rec.ccName == cc){
              
              srs.push(rec.catTotal);
              this.totalByCC += rec.catTotal;
              if(this.activityChartDataForBranchs.series.length != 0 && rec.ccName == cc ){
                this.activityChartDataForBranchs.series[0].push(rec.catTotal);

                srs = [];
                debugger;
              }
            } 
          });
          if(this.activityChartDataForBranchs.series.length == 0){
            this.activityChartDataForBranchs.series.push(srs);
            srs = [];
            debugger;
          }

      });
      
      
      // let lnthCC = this.activityChartDataForBranchs.labels.length;
      // let lnthCat = records.length;
      // let srsArray = [];
      //     this.activityChartDataForBranchs.labels.forEach(cc=>{
      //   srsArray.push([]);
      // });
      // srsArray.forEach(arr => {
      //   debugger;
      //   this.activityChartDataForBranchs.labels.forEach(cc=>{
      //     arr.push(0);
      //   });
      // });
      // debugger;  

      // records.forEach((rec, iCat)=>{
      //   let series: any[] = [];
      //   debugger;
      //   this.activityChartDataForBranchs.labels.forEach((lb, iCC) => {
      //       if(rec.ccName == lb){
      //                 series.push(rec.catTotal);
      //                 if(iCC == 0){
      //                   cat1 = rec.catName
      //                 }
      //                 if(iCC == 1){
      //                   cat2 = rec.catName
      //                 }
      //                 if(iCC == 2){
      //                   cat3 = rec.catName
      //                 }
      //                 debugger;
      //       } 
      //   });
      //   this.activityChartDataForBranchs.series.push(series);
      //   debugger;
      // });
    //   this.activityChartDataForBranchs.series.forEach((cat: any[])=>{
    //     debugger;
    //     let lnthCC = this.activityChartDataForBranchs.labels.length
    //     let lnthCat = cat.length;
    //     if(lnthCat < lnthCC){
    //       var i;
    //       for (i = 0; i < lnthCat; i++) {
    //         cat.push(0);
    //         debugger;
    //       }
    //     }
    // });
 

     ////////////////////
     this.activityChartOptions = {
       seriesBarDistance: 10,
       axisX: {
         showGrid: false
       },
       height: '245px'
     };
     this.activityChartResponsive = [
       ['screen and (max-width: 640px)', {
         seriesBarDistance: 5,
         axisX: {
           labelInterpolationFnc: function (value) {
             return value[0];
           }
         }
       }]
     ];
     this.activityChartLegendItemsBranchs = [
       { title: 'braaaaanch', imageClass: 'fa fa-circle text-info' },
       { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
     ];

    // if(records != undefined && records.labels[0] != null){ cat1 = records.labels[0]; }
    // if(records != undefined && records.labels[1] != null){ cat2 = records.labels[1]; }
    // if(records != undefined && records.labels[2] != null){ cat3 = records.labels[2]; }

    this.activityChartLegendItemsBranchs = [
      { title: cat1, imageClass: 'fa fa-circle text-info' },
      // { title: cat2, imageClass: 'fa fa-circle text-danger' },
      // { title: cat3, imageClass: 'fa fa-circle text-warning' },

    ];
  }
  loadSeriesForMonths(records?): number[]{
  //  ;
    let series = [0,0,0,0,0,0,0,0,0,0,0,0];
    if(records != null){
      series = records;
    }
    return series;
  }
  loadSeriesForBranchs(records?): String[]{
 //   ;
    let series: String[] = [];
    this.CostCenters.forEach(cc=>{
   //   ;
      series.push(cc.ccName.toString())
    });
     return series;
  }
  setOneMonthDate(){

     let month = this.dateTo.getMonth();
    //  let pastmonth = month-1;
    //  this.dateFrom.setMonth(pastmonth);
     this.ToDateString = this.dateTo.getDate() + " / " + this.dateTo.getMonth() + " / " + this.dateTo.getFullYear();
     this.FromDateString = this.dateFrom.getDate() + " / " + this.dateFrom.getMonth() + " / " + this.dateFrom.getFullYear();

  }
  //////////////////////   /////////////////////////////

  formatCurrency_TaxableValue(event)
  {
    var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
    // this.tax = event.target.value;
    // this.taxableValue = uy;
  }
  getCurrentUser(){
    // this.sharedDataSrv.getCurrentUser().subscribe( res=>{
    //       
    //       this.usr = res;
    // })
    this.strSrv.getUserFromStorage().subscribe(usr=>{
      
      this.usr = usr;
    });
  }
  onUpdatestatistics() {
      
      this.TotalInvoicesAmount = 0;
      this.pageIndex = 1;

      this.InvoicesMonths.forEach(i=>{
        this.TotalInvoicesAmount += i.invAmount;
      });

  }
  onGetAllInvoices() {
    
     this.InvoicesMonths = [];
     this.TempInvoicesMonths = [];
     this.InvoicesBranches = [];
     this.TempInvoicesBranches = [];
     this.loading = true;
     this.invSrv.getAllInvoices(this.dateFrom, this.dateTo).subscribe((invs: InvoicesModel[]) => {
            debugger;
            this.loading = false;
             invs.forEach(inv=>{  
                  this.InvoicesMonths.push(inv);
              });
           
            this.onUpdatestatistics();
     }, err=>{
      this.alertService.danger('Server Error');
      this.loading = false;
     });
  
  }
  onGetAllSuppliers() {
    //  
     this.spltSrv.getAllSuppliers().subscribe((spls: SupplierModel[]) => {
        debugger;
        this.Suppliers = spls;
     });
  }
  onGetAllCostCenters() {
     this.ccSrv.getCostCentersByEmpId().subscribe((ccs: CostCenterModel[]) => {
      debugger;
      this.CostCenters = ccs;  
     });
  }
  onGetAllItemsCategorys() {
    //  
     this.icSrv.getAllItemsCategorys().subscribe((ics: ItemsCategoryModel[]) => {
      debugger;   
        this.ItemsCategorys = ics;
     });
  }
  selectSupplierEvent(event) {
      this.invoiceForm.controls['splId'].setValue(event.splId);
  }
  selectCostCenterEvent(event) {
        this.invoiceForm.controls['CostCenterId'].setValue(event.CostCenterId);
  }
  onSubmit(status): void {
    if (!this.invoiceForm.value.InvoiceId) {
            this.loading = true;
            let finalDate = new Date(this.getInvdate.value).toLocaleString();
            this.invoiceForm.get('invDate').setValue(finalDate);
            this.invSrv.addInvoice(this.invoiceForm.value).subscribe(ItemsCategoryAdded => {
              this.alertService.success('Invoice Uploaded Successfully');
                  this.invoiceForm.reset();
                  // var supplierHTMLelemnt = <HTMLInputElement> document.getElementById('splId--');
                  // supplierHTMLelemnt.value = '';
                  this.loading = false;
                  this.onGetAllInvoices();
            }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
            });
    } else if (this.invoiceForm.value.InvoiceId) {
            
            this.invSrv.editInvoice(this.invoiceForm.value.InvoiceId, this.invoiceForm.value).subscribe(ItemsCategoryAdded => {
                  this.invoiceForm.reset();
                  this.onGetAllInvoices();
                  this.alertService.success('Invoice Changed Successfully');
            }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
            });
    }
  }
  onCancel() {
    this.invoiceForm.reset();
  }
  onChangeDate(e){
      
      if(this.checkDateInRange(e)){
        this.invoiceForm.get('invDate').setValue(e.target.value);
      }
  }
  checkDateInRange(dateToCheck: any): boolean {
    //Console examples
    if(this.minDate < dateToCheck && dateToCheck < this.maxDate){
        //console.log('the date : ', dateToCheck, ' is more than', minInput, ' is less than', maxInput);
        return true;
    } else {
      return false;
    }

  }
  fileChangeListener(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
     console.log( 'reader.result' ,reader.result);
   //  this.imageCropData = reader.result;
      //console.log( 'MY Photo'  ,  reader.result);
      this.invoiceForm.get('InvFile').setValue(reader.result);
      //console.log('  this.userForm.value  ', this.userForm.value);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  //////////////////////////////////// Invoices List //////////////////////////////
  onSelectAll(e) {
   // 
    this.SelectedInvoices = [];
    
    if(e.target.checked){
        this.InvoicesMonths.forEach(val => { 
          val.checkbox = true;
          this.SelectedInvoices.push(val);
        });
    } else if(!e.target.checked){
      this.InvoicesMonths.forEach(val => { val.checkbox = false });
    }
      // this.onUpdatestatistics();
  }
  onSelect(e, ast) {
    // 
    // console.log(e);
    if(e.target.checked)
    {
      this.SelectedInvoices.push(ast);
      let allChecked = true;
      this.InvoicesMonths.forEach((invoice, index) => {
        var invoiceItemHTMLelemnt = <HTMLInputElement> document.getElementById('invoiceItem--' + index);
        if(!invoiceItemHTMLelemnt.checked) allChecked = false;
        // this.onUpdatestatistics();
      });
      if(allChecked) 
      var invoiceItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("invoiceItemALL--");
      invoiceItemALLHTMLelemnt.checked = true;
      // this.onUpdatestatistics();
    }
    else if (!e.target.checked){
      var invoiceItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("invoiceItemALL--");
      if(invoiceItemALLHTMLelemnt.checked) invoiceItemALLHTMLelemnt.checked = false;
      this.SelectedInvoices.filter((invoice, selectedIndex) => {
        if (invoice.InvoiceId === ast.InvoiceId) {
          this.SelectedInvoices.splice(selectedIndex, 1);
        //  this.onUpdatestatistics();
        }
      });
    }
   // this.onUpdatestatistics();
  }
  onExportExcel() {
    if(this.SelectedInvoices.length == 0){
      this.alertService.danger('No Invoice Selected');
    } else{
      this.expExcelSrv.exportAsExcelFile(this.SelectedInvoices, 'Invoices List');
    }
  }
  onPrintPreviewSelectedInvoices() {
    // console.log(ast);
    // 
    // this.bsModaleRef = this.modalService.show(AddeditasstComponent, {initialState: {ast}});
    // this.bsModaleRef.content.onClose = (updated) => {
    //   if (updated) {
    //     this.onGetAllInvoices();
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
    // console.log(event);
  }
  onShowHideStatistics() {
    this.showStatistics = !this.showStatistics;
  }
  onChangeRowsPerPage(event) {
    this.pageSize = event.target.value;
    this.pageIndex = 1;
    this.onUpdatestatistics();
  }
  onEditInvoice(inv: InvoicesModel) {
    
    //   this.invoiceForm.reset();
      // this.invoiceForm.setValue(inv);

      this.invoiceForm.get('InvoiceId').patchValue(inv.InvoiceId);
      this.invoiceForm.get('invNumber').patchValue(inv.invNumber);
      this.invoiceForm.get('invAmount').patchValue(inv.invAmount);
      this.invoiceForm.get('Remarks').patchValue(inv.Remarks);
      this.invoiceForm.get('invDate').patchValue(inv.invDate);
      this.invoiceForm.get('invStatus').patchValue(inv.invStatus);  
      this.invoiceForm.get('icId').patchValue(inv.icId); 
      this.invoiceForm.get('ItemsCategoryName').patchValue(inv.ItemsCategoryName);     
      this.invoiceForm.get('CostCenterId').patchValue(inv.CostCenterId);
      this.invoiceForm.get('CostCenterName').patchValue(inv.CostCenterName);   
      this.invoiceForm.get('splId').patchValue(inv.splId);
      this.invoiceForm.get('SupplierName').patchValue(inv.SupplierName);
      this.invoiceForm.get('InvFile').patchValue(inv.InvFile);
      
      this.invoiceForm.patchValue(inv);
      
      let file = inv.InvFile.toString();
      this.invoiceForm.get('InvFile').setValue(file);
  

  }
  onDeleteInvoice(inv: InvoicesModel) {
    Swal.fire({
      title: 'Invoice # ( ' + inv.invNumber + ' ) Will be deleted permanently</h4>',
      icon: 'info',
      // html: ' <ul *ngFor=" let a of assets "> <li> a.invCode  </li>   </ul> ',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:  '<i class="fa "></i>Yes Delete It',
      confirmButtonAriaLabel: '',
      cancelButtonText:  '<i class="fa ">Cancel</i>',
      cancelButtonAriaLabel: ''
    }).then(res => {
      if(res.value){
    //    
        this.invSrv.deleteInvoice(inv.InvoiceId).subscribe((inv: InvoicesModel) => {
          this.alertService.success('Deleted Successfully');
          this.onGetAllInvoices();
        }, error => {
          this.loading = false;
          if(error.message.includes('Http failure response for http://')){
            this.alertService.danger('Server error');
          }
        });
      }
    })
  }
  onDeleteAllSellected() {
  //  
    this.loading = true;
    if(this.SelectedInvoices.length == 0) {
   //   this.swalSrv.showSwal('basic-info', 'At leinv one invoice must be selected');

    } else {
      let ids = [];
      this.SelectedInvoices.forEach(em => {
        ids.push(em.InvoiceId);
      });

      Swal.fire({
        title: this.SelectedInvoices.length + 'Invoices Will be deleted permanently</h4>',
        icon: 'info',
        // html: ' <ul *ngFor=" let a of invoices "> <li> a.invCode  </li>   </ul> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:  '<i class="fa "></i>Yes Delete',
        confirmButtonAriaLabel: '',
        cancelButtonText:  '<i class="fa "> Cancel</i>',
        cancelButtonAriaLabel: ''
      }).then(res => {
        if(res.value){
     //     
          this.invSrv.deleteSelectedInvoices(ids).subscribe((dltinv: InvoicesModel[]) => {
            this.onGetAllInvoices();
         //   this.swalSrv.showSwal('basic-success', "( " + dltAsts.length + " ) Invoices have been deleted successfully ");
            this.SelectedInvoices = [];
            // this.onget();
            this.loading = false;
          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')){
        //      this.swalSrv.showSwal('basic-error', " Server connection Error / Data is not updated ");
            }
          });

        }

      })

    }
  }
  downloadInvoice(invFile, invNumber, SupplierName) {
        const downloadLink = document.createElement("a");
        const fileName = "Inv-" + invNumber + "-" + SupplierName +  ".pdf";

        downloadLink.href = invFile;
        downloadLink.download = fileName;
        downloadLink.click();
  }
  /////////// Filters ////////////////////
  onFilterChange(filters: any, filterBy){
  
   // this.setOneMonthDate();

   this.loading = true;
   this.invSrv.getAllInvoices(this.dateFrom, this.dateTo).subscribe((invoices: InvoicesModel[]) => {
    debugger;
    this.TempInvoicesMonths = [];
    this.TempInvoicesBranches  = [];

    invoices.forEach(inv => {  
      this.TempInvoicesMonths.push(inv);
      this.TempInvoicesBranches.push(inv);
    });
    this.loading = false;

   if(filterBy == 'forBranchs'){
         
         this.InvoicesBranches  = [];
         this.TempInvoicesBranches.forEach(inv =>{
         //  ;
           if(inv.ItemsCategoryName == filters.ItemsCategoryName1 || 
             inv.ItemsCategoryName == filters.ItemsCategoryName2 ||
             inv.ItemsCategoryName == filters.ItemsCategoryName3 ||
             inv.ItemsCategoryName == filters.ItemsCategoryName4 ){
               this.InvoicesBranches.push(inv);
             }
         });
         this.TempInvoicesBranches =  this.InvoicesBranches;
         this.InvoicesBranches = [];
         this.TempInvoicesBranches.forEach(inv => {
           let invdate = new Date(inv.invDate);
           if(invdate > this.dateFrom && invdate < this.dateTo){
             this.InvoicesBranches.push(inv);
           }
         });      
         if(this.activityChartDataForBranchs != null){
          this.activityChartDataForBranchs.labels = [];
          this.activityChartDataForBranchs.series = [];
         }
       //  debugger;
         const ChartDataForBranchs = this.invSrv.calculateByCategoriesForCC(this.InvoicesBranches, this.dateFrom, this.dateTo);
       //  debugger;
         this.loadChartBranchs(ChartDataForBranchs);
         this.activityChartDataForBranchs;

   } else if(filterBy == 'forMonths') {
         ;
         this.InvoicesMonths = [];
         this.TempInvoicesMonths.forEach(inv =>{
           if(inv.ItemsCategoryName == filters.ItemsCategoryName1 || 
             inv.ItemsCategoryName == filters.ItemsCategoryName2 ||
             inv.ItemsCategoryName == filters.ItemsCategoryName3 ||
             inv.ItemsCategoryName == filters.ItemsCategoryName4 ){
               this.InvoicesMonths.push(inv);
             }
         });
         this.activityChartDataForMonths.series = [];
         let series: any = this.invSrv.calculateByCategories(this.InvoicesMonths);
         //debugger;
         this.loadChartMonths(series);
         this.activityChartDataForMonths;
   }
   ;
   this.loading = false;
   this.onUpdatestatistics();
   });
  }
  onYearChange(e){
    debugger;
    if(e.target.value == "2021"){
      this.dateFrom.setFullYear(2021);
    } else if(e.target.value == "2020"){
      this.dateFrom.setFullYear(2020);
    }
    this.onFilterChange(this.filterByMonthForm.value, 'forMonths');

  }
  buildFilterbyMonthForm(): void {
    this.filterByMonthForm = this.fb.group({
      ItemsCategoryName1: new FormControl(''),
      ItemsCategoryName2: new FormControl(''),
      ItemsCategoryName3: new FormControl(''),
      ItemsCategoryName4: new FormControl('')
    });
  }
  buildFilterByBranchForm(): void {
    this.filterByBranchForm = this.fb.group({
      ItemsCategoryName1: new FormControl(''),
      ItemsCategoryName2: new FormControl(''),
      ItemsCategoryName3: new FormControl(''),
      FromDate: new FormControl(''),
      ToDate: new FormControl('')
    });
  }
  onFilterInvoicesByDate(e: Date, form, chart){
    this.dateFrom = new Date(e[0]);
    this.dateTo = new Date(e[1]);
    this.ToDateString = this.dateTo.getDate() + " / " + this.dateTo.getMonth() + " / " + this.dateTo.getFullYear();
    this.FromDateString = this.dateFrom.getDate() + " / " + this.dateFrom.getMonth() + " / " + this.dateFrom.getFullYear();
    this.onFilterChange(form, chart);
  }

  get getInvoiceForm() { return this.invoiceForm.controls; }
  get getInvoiceId() { return this.invoiceForm.get('InvoiceId') as FormControl;   }
  get getInvdate() {  return this.invoiceForm.get('invDate') as FormControl;  }
  get getSupplierName() { return this.invoiceForm.get('SupplierName') as FormControl; }
  get getInvFile() {  return this.invoiceForm.get('InvFile') as FormControl; }

  IsInvFileExist(invFile) {
    let is = false
    if(invFile != null){
      is = true;
    };
    return is;
  }


}
