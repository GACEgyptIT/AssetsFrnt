import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';
import { DepartmentService } from 'app/masterdata/department/services/department.service';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { SOHModel } from 'app/shared/models/SOHModel';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { SweetalertService } from 'app/sweetalert.service';
import { now } from 'moment';
import { AlertService } from 'ngx-alerts';
import { ItemService } from '../item/service/item.service';


@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {

  public loading = false;
  searchForm: FormGroup;
  pageIndex: number = 1;
  pageSize: number = 10;
  SOH: SOHModel = {};
  ItemNameIsSelected = false;
  EmployeeIsSelected = false;
  CompanyNameIsSelected = false;
  BranchNameIsSelected = false;
  DepartmentNameIsSelected = false;
  Items: ItemModel[] = [];
  Branchs: BranchsModel[] = [];
  Departments: DepartmentModel[] = [];
  Companys: CompanyModel[] = [];
  Employees: EmployeeModel[] = [];
  BranchsFilt: BranchsModel[] = [];
  DepartmentsFilt: DepartmentModel[] = [];
  CompanysFilt: CompanyModel[] = [];
  EmployeesFilt: EmployeeModel[] = [];
  order: string = "info.name";
  reverse: boolean = false;
  dateFrom: Date = new Date('02.01.2020');
  dateTo: Date = new Date();
  
  constructor(        

    private fb: FormBuilder,
    private expExcelSrv: ExportexcelService,
    private alrtSrv: AlertService,
    private swalSrv: SweetalertService,
    private dptSrv: DepartmentService,
    private brnSrv: BranchService,
    private comSrv: CompanyService,
    private empSrv: EmployeeService,
    private itmSrv: ItemService

    ) { }

  ngOnInit() {
    
    this.onGetAllBranchs();
    this.onGetAllCompanys();
    this.onGetAllEmployees();
    this.onGetAllItemss();
    this.onGetAllDepartments();
    this.buildSearchForm();

  }

  onGetAllCompanys() {
   // this.loading = true;
    this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
            this.Companys = coms;
     }, error => {
       //     this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alrtSrv.danger('Server error');
            }
    });
  }
  onGetAllEmployees() {
      this.empSrv.getAllEmployees().subscribe((dpts: EmployeeModel[]) => {
        this.Employees = dpts;
      });
  }
  onGetAllItemss() {
    this.itmSrv.getAllItems().subscribe((itms: ItemModel[]) => {
      this.Items = itms;
    });
  }
  onGetAllDepartments() {
        this.dptSrv.getAllDepartments().subscribe((dpts: DepartmentModel[]) => {
          this.Departments = dpts;
         });
  }
  onGetAllBranchs() {
         this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
           this.Branchs = brns;
          });
  }
  searchFilter(filters: any): void {
  
    this.SOH.ItemVMs = [];
    this.SOH.StoreVMs = [];
    this.SOH.EmployeeVMs = [];
    this.SOH.DepartmentVMs = [];
    this.SOH.BranchVMs = [];
    this.SOH.CompanyVMs = [];

    this.loading = true;
 
    this.itmSrv.getConsumptionItem(this.searchForm.value).subscribe((soh: SOHModel) => {
            this.SOH = soh;
         //   this.searchForm.reset();
            debugger;
    });
  }

  buildSearchForm(): void {
    this.searchForm = this.fb.group({
      itmId: null,
      empId: null,
      dptId: null,
      brnId: null,
      comId: null,
      FilterBy: null,
      EmpName: null,
      DepName: null,
      BrnName: null,
      ComName: null,
      ItemName: null,
      FromDate: new Date('02.01.2020'),
      ToDate: new Date()

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
  checkDepartmentFilterSelection(e){
    
      if(e != "" ){
        this.DepartmentNameIsSelected = true;
      } if(e == ""){
        this.DepartmentNameIsSelected = false;
      }
  }
  onExportExcel() {
  //   if(this.Records.length == 0){
  // //    this.swalSrv.showSwal('basic-info', 'At least one asset must be selected');
  //   } else{
  //     this.expExcelSrv.exportAsExcelFile(this.Records, 'Records List');
  //   }

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
     if (this.order === value) {
       this.reverse = !this.reverse;
     }
     this.order = value;
  }


   public onEmployeeSelect(e) {
    this.searchForm.get('DptName').setValue(null);
    this.searchForm.get('BrnName').setValue(null);
    this.searchForm.get('ComName').setValue(null);

    this.searchForm.get('empId').setValue(e.target.value);
    this.searchForm.get('EmpName').setValue(e.target.selectedOptions[0].text.toString());
  }
  public onDepartmentSelect(e) {
    this.searchForm.get('empName').setValue(null);
    this.searchForm.get('brnName').setValue(null);
    this.searchForm.get('comName').setValue(null);

    this.searchForm.get('dptId').setValue(e.target.value);
    this.searchForm.get('dptName').setValue(e.target.selectedOptions[0].text.toString());
  }
  public onBranchSelect(e) {
    this.searchForm.get('empName').setValue(null);
    this.searchForm.get('dptName').setValue(null);
    this.searchForm.get('comName').setValue(null);

    this.searchForm.get('brnId').setValue(e.target.value);
    this.searchForm.get('brnName').setValue(e.target.selectedOptions[0].text.toString());
  }
  public onCompanySelect(e) {
    this.searchForm.get('empName').setValue(null);
    this.searchForm.get('brnName').setValue(null);
    this.searchForm.get('dptName').setValue(null);

    this.searchForm.get('comId').setValue(e.target.value);
    this.searchForm.get('comName').setValue(e.target.selectedOptions[0].text.toString());
  }

  onChangeFilterBy(e){
    debugger;
    this.getEmpId.setValue(null);
    this.getDptId.setValue(null);
    this.getBrnId.setValue(null);
    this.getComId.setValue(null);

    this.getFilterBy.setValue(e.target.value);

    if(e.target.value == '--Select--'){
       this.getFilterBy.patchValue(null);
       debugger;
    }


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
  onFilterByDate(e: Date){
    this.dateFrom = new Date(e[0]);
    this.dateTo = new Date(e[1]);

    this.getFromDate.setValue(new Date(e[0]));
    this.getToDate.setValue(new Date(e[1]));
  }

   get getFilterBy() { return this.searchForm.get('FilterBy') as FormControl; }

   get getItmId() { return this.searchForm.get('itmId') as FormControl; }

   get getEmpId() { return this.searchForm.get('empId') as FormControl; }
   get getDptId() { return this.searchForm.get('dptId') as FormControl; }
   get getBrnId() { return this.searchForm.get('brnId') as FormControl; }
   get getComId() { return this.searchForm.get('comId') as FormControl; }

   get getEmpName() { return this.searchForm.get('empName') as FormControl; }
   get getDptName() { return this.searchForm.get('dptName') as FormControl; }
   get getBrnName() { return this.searchForm.get('brnName') as FormControl; }
   get getComName() { return this.searchForm.get('comName') as FormControl; }

   get getFromDate() { return this.searchForm.get('FromDate') as FormControl; }
   get getToDate() { return this.searchForm.get('ToDate') as FormControl; }


}
