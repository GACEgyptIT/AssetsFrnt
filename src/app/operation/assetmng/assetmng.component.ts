import { Component, OnInit, ViewChild } from '@angular/core';
//import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AssetService } from 'app/masterdata/asset/services/asset.service';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import { AssetModel } from 'app/shared/models/AssetModel';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';
import { AssettypeService } from 'app/masterdata/assettype/services/assettype.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { AssetTrackingModel } from 'app/shared/models/AssetTrackingModel';
import Swal from 'sweetalert2';
import { SweetalertService } from 'app/shared/services/sweetalert.service';
import { AlertService } from 'ngx-alerts';
import { LogsService } from 'app/shared/services/logs.service';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';

@Component({
  selector: 'app-assetmng',
  templateUrl: './assetmng.component.html',
  styleUrls: ['./assetmng.component.css']
})
export class AssetmngComponent implements OnInit {
  public loading = false;
  showByEmployees = false;
  pageIndex: number = 1;
  pageSize: number = 5;
  public settings = {};
  asset: AssetModel = {};
  assignForm: FormGroup;
  
  @ViewChild('search') search: any;
  CodeExist = false;
  AssetTemp: any = {};
  public temp: AssetModel[] = [];
  public Assets: AssetModel[] = [];
  public columns: Array<object>;

  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];
  SelectedAssets: AssetModel[] = [];
  SelectedEmployees: any = [{ empFullName: '', empHRCode: '', assets: '' }];
  AssetTypes: AssetTypeModel[] = [];
  Branchs: BranchsModel[] = [];
  Employees: EmployeeModel[] = [];
  EmployeesList: EmployeeModel[] = [];
  Companys: CompanyModel[] = [];

  AddUserLog(action: string) {
    this.logSrv.sendUserLog(action).subscribe(res=>{
      //console.log(res);
      
    });
  }

  constructor(
    private swalSrv: SweetalertService,
    private logSrv: LogsService,
    private alertService: AlertService,
    private shrdSrv: ShareddataService,
    private astSrv: AssetService,
    private astTypeSrv: AssettypeService,
    private empSrv: EmployeeService,
    private brnSrv: BranchService,
    private comSrv: CompanyService,
    private expExcelSrv: ExportexcelService,
    private orderPipe: OrderPipe,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.sortedCollection = orderPipe.transform(this.Assets, 'astDescription');
    // ////console.log('sortedCollection....' , this.sortedCollection);
    // for (let i = 1; i <= this.Assets.length; i++) {
    //   this.Assets.push();
    // }
    this.assignForm = this.fb.group({
      empId: ['', Validators.required],
      empFullName: ['', Validators.required],
      empHRCode: null,
      assetsCurrent: [],
      assetsNew: this.fb.array([])
    });
    this.onGetAllEmployees();
    this.onGetAllAssetsTypes();
    this.onGetAllAssets();
    this.onGetAllBranchs();
    this.onGetAllCompanys();
  }
  ngOnInit(): void {
    this.settings = {
      singleSelection: false,
      idField: 'astId',
      textField: "astCodeDescEmp",
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 6,
      searchPlaceholderText: 'Search by Code / Description / Empoyee',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };

    //this.route.queryParams.subscribe(params => {
     // debugger;
      // if(params != {}){
      //   this.assignForm.get('empId').setValue(params.empId);
      //   this.assignForm.get('empFullName').setValue(params.empFullName);
      //   this.assignForm.get('assetsCurrent').setValue(JSON.parse(params.assetsCurrent)); // incase the assets ent from the Emplyee page
  
      //     let id = params.empId;
      //     debugger;
      //     this.empSrv.GetEmployeeById(id).subscribe((e: EmployeeModel)=>{
      //       debugger;
      //       this.assignForm.get('assetsCurrent').patchValue(e.assetsCurrent);
      //       debugger;
      //     });

      //  }
    //});
  }

  onSubmit(): void {
              debugger;
              this.shrdSrv.getCurrentUser().subscribe((res: EmployeeModel) =>{
                this.assignForm.get('empHRCode').setValue(res.empId);
              });
              this.astSrv.assignAssetToEmp(this.assignForm.value).subscribe((emp: EmployeeModel) => { 
                    debugger;
                    this.swalSrv.showSwal('basic-success', "( " + emp.assetsCurrent.length + " )Assets assigned successfully to: " + emp.empFullName + "." );
                    this.onGetAllAssets();
                    this.assignForm.reset();
                    this.onDeSelectAll();
              });
  }
  onCancel() {
    this.assignForm.reset();
  }

  // onScrap(row){
  //   Swal.fire({
  //     title: 'This Asset Will Be Removed from The Operation as a Scrap</h4>',
  //     icon: 'info',
  //     // html: ' <ul *ngFor=" let a of assets "> <li> a.astCode  </li>   </ul> ',
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText:  '<i class="fa "></i>Yes Remove',
  //     confirmButtonAriaLabel: '',
  //     cancelButtonText:  '<i class="fa "> Cancel</i>',
  //     cancelButtonAriaLabel: ''
  //   }).then(res => {
  //     if(res.value){
        
  //       this.astSrv.getAssetId(row.astId).subscribe((a: AssetModel) =>{
  //           this.onGetAllAssets();

  //           this.swalSrv.showSwal('basic-success', "Asset with code( " + a.astCode + " ) Added to the Scrap Successfully ");
  //           this.AddUserLog( "Asset with code( " + a.astCode + " ) Added to the Scrap Successfully ");
  //           // this.AddAssetTrackingLog(a, "Scrap", a.EmployeeName); 
  //           this.logSrv.sendAssetTrackingLog(a, a.EmployeeName, "Scrap").subscribe(logged=>{ 
              
  //             // this.onGetAllAssets();
  //           }); 
          
  //       }, error => {
  //         // this.loading = false;
  //         if(error.message.includes('Http failure response for http://')){
  //           this.swalSrv.showSwal('basic-error', " Server connection Error / Data is not updated ");
  //           this.AddUserLog( "Server connection Error ( " + error + " )" );
  //         }
  //       });

  //     }
  //   })

  //   // 
  //   // this.astSrv.getAssetId(row.astId).subscribe(a=>{
  //   //   // this.onGetAllAssets();
  //   // })
    
  // }
  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.astDescription.toLocaleLowerCase().indexOf(term) > -1 || 
    item.astCode.toLocaleLowerCase().indexOf(term) > -1;
  }
  createItem(item?: AssetModel): FormGroup {
    debugger;
    return this.fb.group({
      astId: item.astId,
      astCode: item.astCode,
      astCodeDescEmp: item.astCodeDescEmp,
      EmployeeId: this.Assets.find(x => x.astId === item.astId).empId,
      EmployeeName: this.Assets.find(x => x.astId === item.astId).EmployeeName
    });
  }
  onChangeAssets(e) {
    
    const numberOfAssets = e.target.value || 0;
    if (this.getAssetsNew.length < numberOfAssets) {
        for (let i = this.getAssetsNew.length; i < numberOfAssets; i++) {
            this.getAssetsNew.push(this.fb.group({
                astCode: ['', Validators.required],
                astDescription: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.getAssetsNew.length; i >= numberOfAssets; i--) {
            this.getAssetsNew.removeAt(i);
        }
    }
  }
  onGetAllAssets() {
    this.loading = true;
          this.astSrv.getAllAssets().subscribe((asts: AssetModel[]) => {
            debugger;
            this.loading = false;
            this.Assets =[];
            asts.forEach(a=>{
              if(!a.IsScrap){
              this.Assets.push(a);
              }
            })
            this.Assets.forEach(x => {
              x.astCodeDescEmp = x.astCode + " - " + x.AssetTypeName  + " - " + x.astDescription + " - " +  x.astCircuitNumber   + " - " + x.astDialNumber  + "  ( Current Emp:  " + x.EmployeeName + " ).";
            });
            this.temp = this.Assets;  // for search
           }, err=>{
            this.alertService.danger('Server Error');
           });
  }
  onGetAllAssetsTypes() {
          this.astTypeSrv.getAllAssetsTypes().subscribe((astTypes: AssetTypeModel[]) => {
                this.AssetTypes = astTypes;
          });
  }
  onGetAllEmployees() {  
    this.loading = true;
         this.empSrv.getAllEmployees().subscribe((emps: EmployeeModel[]) => {
           debugger;
           this.loading = false;
            this.Employees = emps;
            emps.forEach(e => {
                  const employee: EmployeeModel = { empId: 0, empFullName: '', empHRCode: '', EmpCode: '', DepartmentName: ''  };
                  employee.empId = e.empId;
                  employee.empFullName = e.empFullName;
                  employee.DepartmentName = e.DepartmentName;
                  employee.EmpCode = e.empHRCode + " - " + e.DepartmentName +  " - " + e.empFullName + ".";
                  if(employee.EmpCode != null) {
                    this.EmployeesList.push(employee);
                  }
            });
         });
  }
  onGetAllBranchs() {
    this.loading = true;
        this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
          this.loading = false;
             this.Branchs = brns;
        });
  }
  onGetAllCompanys() {
    //       this.loading = true;
          this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
            ////console.log(this.Companys);
            //console.log(coms);
          this.loading = false;
            this.Companys = coms;
           });
  }
  selectEvent(event) {
    debugger;
    this.assignForm.controls['empId'].setValue(event.empId);
    this.assignForm.controls['empFullName'].setValue(event.empFullName);
    this.empSrv.GetEmployeeById(event.empId).subscribe((e:EmployeeModel)=>{
      this.assignForm.get('assetsCurrent').patchValue(e.assetsCurrent);
    });
  }
  IsCircuitNumberExist() {

    return this.Assets.find( ast => {
     //  
      if(ast.astCircuitNumber) {
    //    //console.log(ast.astCircuitNumber)
       return true
      } 
      return false;
 
     });
 
  }
  IsDailNumberExist() {
    return this.Assets.find( ast => {
      if(ast.astDialNumber) {
      return true
      } 
      return false;
    });
  }
  onFilterByAssetType(e) {
    this.pageIndex = 1;
    this.pageSize = 5;
  
    if(e.target.selectedOptions[0].text.toString() == 'Show All') {
          this.showByEmployees = false;
          this.onGetAllAssets();
    } else if(e.target.selectedOptions[0].text.toString() == 'Show By Employees') {
        this.showByEmployees = true;
        this.onGetAllEmployees();
    } else {
          this.showByEmployees = false;
          //  this.onGetAllAssets();
          let val = e.target.selectedOptions[0].text.toString();
          
          // //console.log(Object.keys(this.temp[0]).length);
          const value = val.toString().toLowerCase().trim();
          
          // get the amount of columns in the table
          const count = Object.keys(this.temp[0]).length;
          
          // get the key names of each column in the dataset
          const keys = Object.keys(this.temp[0]);
          
          // assign filtered matches to the active datatable
          this.Assets = this.temp.filter(item => {
            
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
                // //console.log(item, 1);
                return true;
              }
            }
          });
    }

  }
  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    // this.setForm();
    // this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }
  public onFilterChange(item: any) {
    //console.log(item);
    this.customSearchFn;
  }
  public onDropDownClose(item: any) {
    //console.log(item);
  }
  public onItemSelect(item?: AssetModel) {
    debugger;
    //console.log('item  .. ', item);
    this.getAssetsNew.push(this.createItem(item));
    // this.getAssetIds.push(new FormControl(item.astId));
    //console.log('this.getAssignForm...' ,  this.getAssignForm);
    
  }
  public onDeSelect(item: any) {
    
    //console.log(item);
    this.getAssetsNew.removeAt(item);
  }
  public onSelectAllAssets(items: any) {
    
    //console.log(items);
    items.forEach(itm => {
      this.getAssetsNew.push(this.createItem(itm));
    });
  }
  onDeSelectAll(items?: any) {
      this.getAssetsNew.value.forEach(itm => {
            this.getAssetsNew.removeAt(itm);
      });
  }
   onSelectCheckboxAST(e, ast) {
     if(e.target.checked)
     {
       this.SelectedAssets.push(ast);
       let allChecked = true;
       this.Assets.forEach((asset, index) => {
         var assetItemHTMLelemnt =     <HTMLInputElement> document.getElementById('assetItem--' + index);
         if(!assetItemHTMLelemnt.checked) allChecked = false;
         // //console.log(this.SelectedAssets);
       });
       if(allChecked) 
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       assetItemALLHTMLelemnt.checked = true;
       // //console.log('Selected Assets:  ' ,  this.SelectedAssets);
     }
     else if (!e.target.checked){
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
       this.SelectedAssets.filter((asset, selectedIndex) => {
         if (asset.astId === ast.astId) {
           this.SelectedAssets.splice(selectedIndex, 1);
         }
       });
     }
     // //console.log('Selected Assets:  ' ,  this.SelectedAssets);
     // //console.log(' Assets:  ' ,  this.Assets);
     // 
   }
   onSelectCheckboxEMP(e, emp) {
    if(e.target.checked)
    {
      if(emp.assetsCurrent) {
        emp.assetsCurrent.forEach((a, index) =>{
          
             var assetIndex = "Asset " + (index + 1) ;
             a = {[assetIndex]: a.astCode + "-" + a.astDescription };
             Object.assign(emp, a );
  
        })
      }
      this.SelectedEmployees.push(emp);
      let allChecked = true;
      this.Employees.forEach((em, index) => {
        var assetItemHTMLelemnt =     <HTMLInputElement> document.getElementById('employeeItem--' + index);
        if(!assetItemHTMLelemnt.checked) allChecked = false;
        // //console.log(this.SelectedAssets);
      });
      if(allChecked) 
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("employeeItemALL--");
      assetItemALLHTMLelemnt.checked = true;
      // //console.log('Selected Assets:  ' ,  this.SelectedAssets);
    }
    else if (!e.target.checked){
      var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("employeeItemALL--");
      if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
      this.SelectedAssets.filter((em, selectedIndex) => {
        if (em.empId === emp.empId) {
          this.SelectedEmployees.splice(selectedIndex, 1);
        }
      });
    }
    // //console.log('Selected Assets:  ' ,  this.SelectedAssets);
    // //console.log(' Assets:  ' ,  this.Assets);
    // 
  }
   onSelectAllCheckboxAST(e) {
    this.SelectedAssets = [];
    if(e.target.checked){
        this.Assets.forEach(val => { 
          val.checkbox = true;
          this.SelectedAssets.push(val);
        });
    } else if(!e.target.checked){
      this.Assets.forEach(val => { val.checkbox = false });
    }
   
   }
   onSelectAllCheckboxEMP(e) {
    this.SelectedEmployees = [];
    if(e.target.checked){
        this.Employees.forEach(val => { 
          val.checkbox = true;
          this.SelectedEmployees.push(val);
        });
    } else if(!e.target.checked){
      this.Employees.forEach(val => { val.checkbox = false });
    }
   
   }
   onExportExcel() {
     if(this.showByEmployees){
      this.expExcelSrv.exportAsExcelFile(this.SelectedEmployees, 'Employees');
     } if(!this.showByEmployees){
      this.expExcelSrv.exportAsExcelFile(this.SelectedAssets, 'Assets');
     }
 
   }
   onPrintPreviewSelectedAssets() {
     // //console.log(ast);
     // 
     // this.bsModaleRef = this.modalService.show(AddeditasstComponent, {initialState: {ast}});
     // this.bsModaleRef.content.onClose = (updated) => {
     //   if (updated) {
     //     this.onGetAllAssets();
     //     //console.log('Edit clicked inside');
     //   }
     // };
     // //console.log('Edit clicked');
   }
   setOrder(value: string) {

     if (this.order === value) {
       this.reverse = !this.reverse;
     }
 
     this.order = value;
   }
   onSort(event) {
     // //console.log(event);
   }
   updateFilter(val: any) {
  
     
     // //console.log(Object.keys(this.temp[0]).length);
     const value = val.toString().toLowerCase().trim();
     
     // get the amount of columns in the table
     const count = Object.keys(this.temp[0]).length;
     
     // get the key names of each column in the dataset
     const keys = Object.keys(this.temp[0]);
     
     // assign filtered matches to the active datatable
     this.Assets = this.temp.filter(item => {
       
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
           // //console.log(item, 1);
           return true;
         }
       }
     });
 
     //Whenever the filter changes, always go back to the first page
   }
   OnCodeChange(e) {
     
     //console.log(e);
     this.CodeExist = false;
     if (e.target.value.length >= 6) {
       this.astSrv.GetAsssetByCode(e.target.value).subscribe(ast => {
         if(ast) {
           this.CodeExist = true;
           this.AssetTemp = ast;
         } else if (!ast) {
           this.CodeExist = false;
         }
         
         //console.log(ast);
       });
     }
   
   }
   onBringExistingAsset() {
     this.assignForm.patchValue(this.AssetTemp);
     this.assignForm.controls.AssetTypes.get('asttypName').patchValue(this.AssetTemp.AssetType.asttypName);

   }
   ngAfterViewInit(): void {
   //  
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
     
     // //console.log(event);
     // //console.log(event.target.value);
     this.pageSize = event.target.value;
     this.pageIndex = 1;
   }

    get getAssignForm() { return this.assignForm.controls; }
    get getToEmp() { return this.getAssignForm.toEmpName as FormControl; }
    get getAssetsCurrent() { return this.getAssignForm.assetsCurrent as FormArray; }
    get getAssetsNew() { return this.getAssignForm.assetsNew as FormArray; }

}
