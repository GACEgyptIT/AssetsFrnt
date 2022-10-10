import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { InvoicemngService } from './service/invoicemng.service';
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
import { stringify } from '@angular/compiler/src/util';

declare var $: any;
@Component({
  selector: 'app-invoicemng',
  templateUrl: './invoicemng.component.html',
  styleUrls: ['./invoicemng.component.css']
})
export class InvoicemngComponent implements OnInit, AfterViewInit {

  AttachedInvFile: any;
  InvDateNgModel = "";

  TotalInvoicesAmount=0;

  totalLaptops = 0; totalDesktops = 0 ;  totalMobiles = 0; totalInvoices = 0; totalScreens = 0; totalPrinters = 0; totalServers = 0;  
  totalDataLines = 0; selectedInvoices =0; noCompany = 0; noBranch = 0; noEmployee = 0; totalVoiceLines=0; noAssetType=0;

  invoiceForm: FormGroup;
  searchForm: FormGroup;
  public CostCenters: CostCenterModel[] = [];
  public Suppliers: SupplierModel[] = [];
  public ItemsCategorys: ItemsCategoryModel[] = [];
  public SelectedInvoices: InvoicesModel[] = [];
  public Invoices: InvoicesModel[] = [];
  public TempInvoices: InvoicesModel[] = [];
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
  dateFrom: Date = new Date('02.01.2020');
  dateTo: Date = new Date();
  FromDateString = '';
  ToDateString = '';

  usr: EmployeeModel;
createInvoiceForm(){
  this.invoiceForm = this.fb.group({
    InvoiceId: null,
    invNumber:  [null, Validators.required],
    invAmount:  [null, Validators.required],
    invDate: [this.currentDate, Validators.required],
    Remarks: null,
    InvFile: null,
    InvFileAttached: false,
    invStatus: ['Paid', Validators.required],
    ItemsCategoryName: null,
    CostCenterName: null,
    SupplierName: null,
    splId:null,
    CostCenterId:  null,
    icId: null
  });
}
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
    this.createInvoiceForm();
    this.onGetAllItemsCategorys();
    this.onGetAllCostCenters();
    this.onGetAllSuppliers();
    this.onGetAllInvoices();
  }

  ngOnInit(){
  
    this.buildSearchForm();
    this.setOneMonthDate();
  }
  setOneMonthDate(){
   // //debugger;
    let mytime = this.dateTo.toTimeString();
    let month = this.dateTo.getMonth();
  
    this.ToDateString = this.dateTo.getDate() + " / " + this.dateTo.getMonth() + " / " + this.dateTo.getFullYear();
    // let pastmonth = month - 1;
    // this.dateFrom.setMonth(pastmonth);
    this.FromDateString = this.dateFrom.getDate() + " / " + this.dateFrom.getMonth() + " / " + this.dateFrom.getFullYear();

  }
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

      this.Invoices.forEach(i=>{
        this.TotalInvoicesAmount += i.invAmount;
      });

  }
  onGetAllInvoices() {

     this.Invoices = [];
     this.TempInvoices = [];
     this.loading = true;
    // //debugger;
     this.invSrv.getAllInvoices(this.dateFrom, this.dateTo).subscribe((invs: InvoicesModel[]) => {
            //debugger;
            this.usr = this.strSrv.getUserFromStorage();
            //debugger;
             invs.forEach(inv=>{  
              this.Invoices.push(inv);
            //       if(this.usr.userRole.includes("IT")){
            //         this.Invoices.push(inv);
            //     //   this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Cairo")){
            //          this.Invoices.push(inv);
            //  //    this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("AirPort") && inv.CostCenterName.includes('AirPort') ){
            //            this.Invoices.push(inv);
            //  //  this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Alex") && inv.CostCenterName.includes('Alex') ){
            //        this.Invoices.push(inv);
            // //      this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Alex-Port") && inv.CostCenterName.includes('Alex-Port') ){
            //       this.Invoices.push(inv);
            //   //      this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Kader") && inv.CostCenterName.includes('Kader') ){
            //       this.Invoices.push(inv);
            //     //   this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Zegiew") && inv.CostCenterName.includes('Zegiew') ){
            //       this.Invoices.push(inv);
            // //        this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("DMT") && inv.CostCenterName.includes('DMT') ){
            //        this.Invoices.push(inv);
            //   //      this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("PSD") && inv.CostCenterName.includes('PSD') ){
            //       this.Invoices.push(inv);
            //     //   this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Sokhna") && inv.CostCenterName.includes('Sokhna') ){
            //        this.Invoices.push(inv);
            //       this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Sharm") && inv.CostCenterName.includes('Sharm') ){
            //         this.Invoices.push(inv);
            //   //      this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Safaga") && inv.CostCenterName.includes('Safaga') ){
            //        this.Invoices.push(inv);
            //     //    this.TempInvoices.push(inv);
            //       } if(this.usr.userRole.includes("Free") && inv.CostCenterName.includes('Free') ){
            //         this.Invoices.push(inv);
            //    //     this.TempInvoices.push(inv);
            //       }
             });
            this.loading = false;
            this.onUpdatestatistics();
     }, err=>{
      this.alertService.danger('Server Error');
      this.loading = false;
     });
  
  }
  onGetAllSuppliers() {
    //  
     this.spltSrv.getAllSuppliers().subscribe((spls: SupplierModel[]) => {
        this.Suppliers = spls;
     });
  }
  onGetAllCostCenters() {
     this.ccSrv.getCostCentersByEmpId().subscribe((ccs: CostCenterModel[]) => {
       //debugger;
       this.CostCenters = ccs;
        // let usr = this.strSrv.getUserFromStorage();
        // if(usr.userRole == "IT"){
        //   this.CostCenters = ccs;
        // } if(usr.userRole.includes("Cairo")){
        //   this.CostCenters = ccs;
        // } if(usr.userRole.includes("Suez")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Suez')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Alex")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Alex')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Airport")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Airport')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Alex-Port")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Alex-Port')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Kader")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Kader')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Zeghiew")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Zeghiew')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Free")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Free')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("DMT")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('DMT')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("PSD")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('PSD')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Sharm")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Sharm')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Sokhna")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Sokhna')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // } if(usr.userRole.includes("Safaga")){
        //   ccs.forEach(cc=>{
        //     if(cc.ccName.includes('Safaga')){
        //       this.CostCenters.push(cc);
        //     }
        //   });
        // }
 
     });
  }
  onGetAllItemsCategorys() {
    //  
     this.icSrv.getAllItemsCategorys().subscribe((ics: ItemsCategoryModel[]) => {
    //    
        this.ItemsCategorys = ics;
     });
  }
  selectSupplierEvent(event) {
      //debugger;
      this.invoiceForm.controls['splId'].setValue(event.splId);
      this.invoiceForm.controls['SupplierName'].setValue(event.splName);
  }
  selectCostCenterEvent(event) {
    //debugger;
        this.invoiceForm.controls['CostCenterId'].setValue(event.CostCenterId);
        this.invoiceForm.controls['CostCenterName'].setValue(event.ccName);
  }
  onSelectCategory(e){
       //debugger;
    this.invoiceForm.controls['ItemsCategoryName'].setValue(e);
  }
  onSubmit() {
    //debugger;
    if (!this.invoiceForm.value.InvoiceId) {
            this.loading = true;
            let finalDate = new Date(this.getInvdate.value).toLocaleString();
            this.invoiceForm.get('invDate').setValue(finalDate);
            this.invSrv.addInvoice(this.invoiceForm.value).subscribe((inv: InvoicesModel) => {
                  //debugger;
                  if(this.AttachedInvFile != null){
                    let formData = new FormData();
                    let FileName = inv.InvFile;
                    formData.set('FileName', inv.InvFile);
                    formData.append(FileName, this.AttachedInvFile);
                    this.invSrv.UploadInvoice(formData, inv).subscribe(res=>{
                      });
                  }
                  this.invoiceForm.reset();
                  window.location.reload();
                  this.loading = false;
                  this.alertService.success('Invoice Uploaded Successfully');
                  this.onGetAllInvoices();
            }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
            });
    } else if (this.invoiceForm.value.InvoiceId) {
      //debugger;
            this.invSrv.editInvoice(this.invoiceForm.value.InvoiceId, this.invoiceForm.value).subscribe(res => {
              //debugger;
            //  this.invoiceForm.reset();
            if(res){
              this.alertService.success('Invoice Changed Successfully');
            }else{
              this.alertService.danger('Saving Failed');
            }
          
            this.onGetAllInvoices();
                 
            }, error => {
              //debugger;
              this.alertService.danger(error.message);
                  // console.log('Data is not Imported ...' ,  error.message);
                  // this.loading = false;
                  // if(error.message.includes('Http failure response for http://')) {
                  //   this.alertService.danger('Server error');
                  // }
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
    debugger
    let me = this;
   // event.target.files[0].name = "aaaaa";
    let file = event.target.files[0];
  //   file.name =  this.getSupplierName.value + this.getInvNumber.value + ".pdf" ;  
     //debugger;
     this.AttachedInvFile = file;
    let reader = new FileReader();
   // //debugger;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.invoiceForm.get('InvFile').setValue(reader.result);
    };
    this.invoiceForm.get('InvFileAttached').setValue(true);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  //////////////////////////////////// Invoices List //////////////////////////////
  onSelectAll(e) {
   // 
    this.SelectedInvoices = [];
    
    if(e.target.checked){
        this.Invoices.forEach(val => { 
          val.checkbox = true;
          this.SelectedInvoices.push(val);
        });
    } else if(!e.target.checked){
      this.Invoices.forEach(val => { val.checkbox = false });
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
      this.Invoices.forEach((invoice, index) => {
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
      // this.invoiceForm.get('InvFile').patchValue(inv.InvFile);
      // this.invoiceForm.get('InvFileAttached').patchValue(false);


      
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
          //debugger;
          this.alertService.success('Deleted Successfully');
          this.onGetAllInvoices();
        }, err => {
          this.loading = false;
          //debugger;
          if(err.message.includes('Http failure response for http://')){
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
  // downloadInvoice(invId, invNumber, SupplierName) {
  //   //    //debugger;
  //       const downloadLink = document.createElement("a");
  //       const fileName = "Inv-" + invNumber + "-" + SupplierName +  ".pdf";

  //       this.invSrv.getInvoiceById(invId).subscribe((inv: InvoicesModel) => {
  //       //   //debugger;
  //        downloadLink.href =   inv.InvFile;
  //        downloadLink.download = fileName;
  //        downloadLink.click();

  //       });
  // }
  download(invId, invNumber, SupplierName) {
    //debugger;
    this.fileService.downloadInvoiceFile(invId).subscribe(response => {
      //debugger;
      let blob:any = new Blob([response.blob()], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(response.url);
      
  //   this.deleteTempFile(invId);
     
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');

  }
  deleteTempFile(id){
    this.fileService.DeleteTempInvoice(id).subscribe(r=>{
      //debugger;
    });
  }

  /////////// Filters ////////////////////
  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      ItemsCategoryName: new FormControl(''),
      CostCenterName: new FormControl(''),
      SupplierName: new FormControl('')
    });
  }
  searchFilter(filters: any): void {
     this.loading = true;
  //   this.setOneMonthDate();
     this.invSrv.getAllInvoices(this.dateFrom, this.dateTo).subscribe((invoices: InvoicesModel[]) => {
      //debugger;
      this.Invoices = invoices;
      this.TempInvoices = invoices;
      this.usr = this.strSrv.getUserFromStorage();

     this.loading = false;
 
     Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
 
     const keys = Object.keys(filters);
     keys.forEach(k=> console.log(k))
     const filterInvoice = invoice => keys.every(key => invoice[key] === filters[key]);
    
     const invs = this.TempInvoices.filter(filterInvoice);
     this.Invoices = [];
     invs.forEach(inv => {
         let invdate = new Date(inv.invDate);
         if(invdate > this.dateFrom && invdate < this.dateTo){
           this.Invoices.push(inv);
         }
     });
     this.loading = false;
     this.onUpdatestatistics();
     });
  }

  // filterUserList(filters: any): void {

  // }

  updateFilter(val: any) {
    
    if(this.TempInvoices.length > 0){
    // console.log(Object.keys(this.temp[0]).length);
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = Object.keys(this.TempInvoices[0]).length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.TempInvoices[0]);
    // assign filtered matches to the active datatable
    this.Invoices = this.TempInvoices.filter(item => {
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
    this.TempInvoices = this.Invoices;
    } else {
      this.TempInvoices = this.Invoices;
    // console.log(Object.keys(this.temp[0]).length);
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = Object.keys(this.TempInvoices[0]).length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.TempInvoices[0]);
    // assign filtered matches to the active datatable
    this.Invoices = this.TempInvoices.filter(item => {
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
    }
    this.onUpdatestatistics();
    //Whenever the filter changes, always go back to the first page
  }
  onFilterByCostCenter(e) {
    
    this.pageIndex = 1;
    this.pageSize = 5;
    
    if(e.target.selectedOptions[0].text.toString() == 'Show All') {
          this.onGetAllInvoices();
    } else{
            if(this.TempInvoices.length > 0){
              let val = e.target.selectedOptions[0].text.toString().trim();
              // console.log(Object.keys(this.temp[0]).length);
              const value = val.toString().toLowerCase().trim();
              // get the amount of columns in the table
              const count = Object.keys(this.TempInvoices[0]).length;
              // get the key names of each column in the dataset
              const keys = Object.keys(this.TempInvoices[0]);
              // assign filtered matches to the active datatable
              this.Invoices = this.TempInvoices.filter(item => {
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
                
                console.log(this.Invoices);
                console.log(this.TempInvoices);
                this.onUpdatestatistics();
              });
              this.TempInvoices = this.Invoices;
            } else{
              this.TempInvoices = this.Invoices;
              let val = e.target.selectedOptions[0].text.toString().trim();
              // console.log(Object.keys(this.temp[0]).length);
              const value = val.toString().toLowerCase().trim();
              // get the amount of columns in the table
              const count = Object.keys(this.TempInvoices[0]).length;
              // get the key names of each column in the dataset
              const keys = Object.keys(this.TempInvoices[0]);
              // assign filtered matches to the active datatable
              this.Invoices = this.TempInvoices.filter(item => {
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
              this.TempInvoices = this.Invoices;
            }
    
    }
    this.onUpdatestatistics();
  }
  onFilterByCategory(e) {
    
    // if(e.target.value == null){
    //   this.
    // }
    // this.pageIndex = 1;
    // this.pageSize = 5;
    
    // if(e.target.selectedOptions[0].text.toString() == 'Show All') {
    //       this.onGetAllInvoices();
    // } else{
    //       this.Invoices = [];
    //       this.TempInvoices.forEach(inv =>{
            
    //         if(inv.ItemsCategoryName == e.target.selectedOptions[0].text.toString().trim()){
    //           this.Invoices.push(inv);
    //         }
    //       });
    //       this.onUpdatestatistics();
    //}

  }
  onFilterInvoicesByDate(e: Date){
    this.dateFrom = new Date(e[0]);
    this.dateTo = new Date(e[1]);
  }
  ngAfterViewInit(): void {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      fromEvent(this.search.nativeElement, 'keydown')
        .pipe( debounceTime(550), map(x => x['target']['value']) )
          .subscribe(value => {
            this.updateFilter(value);
          });
          this.onUpdatestatistics();
  }

  get getInvoiceForm() { return this.invoiceForm.controls; }
  get getInvoiceId() { return this.invoiceForm.get('InvoiceId') as FormControl;   }
  get getInvdate() {  return this.invoiceForm.get('invDate') as FormControl;  }
  get getSupplierName() { return this.invoiceForm.get('SupplierName') as FormControl; }
  get getInvNumber() { return this.invoiceForm.get('invNumber') as FormControl; }
  get getInvFile() {  return this.invoiceForm.get('InvFile') as FormControl; }

  IsInvFileExist(invFile) {
    let is = false
    if(invFile != null){
      is = true;
    };
    return is;
  }


}
