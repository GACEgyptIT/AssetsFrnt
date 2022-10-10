import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';
//import { StoreService } from 'app/masterdata/Store/services/Store.service';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { StoreModel } from 'app/shared/models/StoreModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { SweetalertService } from 'app/sweetalert.service';
import { AlertService } from 'ngx-alerts';
import { ItemService } from '../item/service/item.service';
import { StoreService } from '../store/service/store.service';
import { SOHModel } from 'app/shared/models/SOHModel';

@Component({
  selector: 'app-soh',
  templateUrl: './soh.component.html',
  styleUrls: ['./soh.component.css']
})
export class SOHComponent implements OnInit {

  public loading = false;
  searchForm: FormGroup;
  pageIndex: number = 1;
  pageSize: number = 10;
  Records: any = [];
  ItemNameIsSelected = false;
  EmployeeIsSelected = false;
  CompanyNameIsSelected = false;
  BranchNameIsSelected = false;
  StoreNameIsSelected = false;
  Items: ItemModel[] = [];
  SOH: SOHModel = {};
  Stores: StoreModel[] = [];

  order: string = "info.name";
  reverse: boolean = false;
  
  constructor(        

    private fb: FormBuilder,
    private expExcelSrv: ExportexcelService,
    private alrtSrv: AlertService,
    private swalSrv: SweetalertService,
    private dptSrv: StoreService,
    private brnSrv: BranchService,
    private comSrv: CompanyService,
    private empSrv: EmployeeService,
    private itmSrv: ItemService

    ) {

      this.onGetAllItemss();
      this.onGetAllStores();
  }

  ngOnInit() {
    

    this.buildSearchForm();

  }

  onGetAllItemss() {
    this.itmSrv.getAllItems().subscribe((itms: ItemModel[]) => {
      this.Items = itms;
    });
  }
  onGetAllStores() {
        this.dptSrv.getAllStores().subscribe((dpts: StoreModel[]) => {
          this.Stores = dpts;
         });
  }

  searchFilter(filters: any): void {
    
    this.SOH.ItemVMs = [];
    this.SOH.StoreVMs = [];
    // this.SOH.itmId = null;
    // this.SOH.strId = null;

    this.loading = true;
 
    this.itmSrv.getSOHItem(this.searchForm.value).subscribe((soh: SOHModel) => {
      debugger;
            this.SOH = soh;
            // this.searchForm.get('itmId').patchValue(null);
            // this.searchForm.get('strId').patchValue(null);
    });
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      StoreName: null,
      ItemName: null,
      itmId: null,
      strId:null
    });
  }
  checkItemFilterSelection(e){
      if(e != ""){
        this.ItemNameIsSelected = true;
      } if(e == ""){
        this.ItemNameIsSelected = false;
      }
  }
  checkEmployeeFilterSelection(e){
    
      if(e != ""){
        this.EmployeeIsSelected = true;
      } if(e == ""){
        this.EmployeeIsSelected = false;
      }
  }
  checkCompanyFilterSelection(e){
    
      if(e != ""){
        this.CompanyNameIsSelected = true;
      } if(e == ""){
        this.CompanyNameIsSelected = false;
      }
  }
  checkBranchFilterSelection(e){
    
      if(e != "" ){
        this.BranchNameIsSelected = true;
      } if(e == ""){
        this.BranchNameIsSelected = false;
      }
  }
  checkStoreFilterSelection(e){
    
      if(e != "" ){
        this.StoreNameIsSelected = true;
      } if(e == ""){
        this.StoreNameIsSelected = false;
      }
  }
  onExportExcel() {
    if(this.Records.length == 0){
  //    this.swalSrv.showSwal('basic-info', 'At least one asset must be selected');
    } else{
      this.expExcelSrv.exportAsExcelFile(this.Records, 'Records List');
    }

  }
  Refresh(){

  }
  onChangeRowsPerPage(event) {
    this.pageSize = event.target.value;
    this.pageIndex = 1;
  }
  onSelectAll(e) {
      
    // this.SelectedAssets = [];
    // if(e.target.checked){
    //     this.Assets.forEach(val => { 
    //       val.checkbox = true;
    //       this.SelectedAssets.push(val);
    //     });
    // } else if(!e.target.checked){
    //   this.Assets.forEach(val => { val.checkbox = false });
    // }
    //   this.onUpdatestatistics();
  }
  onSelect(e, ast) {
    // 
    // console.log(e);
    // if(e.target.checked)
    // {
    //   this.SelectedAssets.push(ast);
    //   let allChecked = true;
    //   this.Assets.forEach((asset, index) => {
    //     var assetItemHTMLelemnt = <HTMLInputElement> document.getElementById('assetItem--' + index);
    //     if(!assetItemHTMLelemnt.checked) allChecked = false;
    //     this.onUpdatestatistics();
    //   });
    //   if(allChecked) 
    //   var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
    //   assetItemALLHTMLelemnt.checked = true;
    //   // this.onUpdatestatistics();
    // }
    // else if (!e.target.checked){
    //   var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
    //   if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
    //   this.SelectedAssets.filter((asset, selectedIndex) => {
    //     if (asset.astId === ast.astId) {
    //       this.SelectedAssets.splice(selectedIndex, 1);
    //       this.onUpdatestatistics();
    //     }
    //   });
    // }
    // this.onUpdatestatistics();
  }
  setOrder(value: string) {
    // 
     if (this.order === value) {
       this.reverse = !this.reverse;
     }
 
     this.order = value;
  }

  get getItemId(){
    return this.searchForm.get('itmId') as FormControl;
  }
  get getStoreId(){
    return this.searchForm.get('strId') as FormControl;
  }

}
