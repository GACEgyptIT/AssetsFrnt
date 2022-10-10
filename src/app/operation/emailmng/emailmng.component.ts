import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AssetService } from 'app/masterdata/asset/services/asset.service';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { CompanyService } from 'app/masterdata/company/services/company.service';
import { ExportexcelService } from 'app/shared/services/exportexcel.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';
import { AssettypeService } from 'app/masterdata/assettype/services/assettype.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';
import { GenaricemailService } from 'app/masterdata/genaricemail/service/genaricemail.service';

@Component({
  selector: 'app-emailmng',
  templateUrl: './emailmng.component.html',
  styleUrls: ['./emailmng.component.css']
})
export class EmailmngComponent implements OnInit {
  public settings = {};
 
  emailForm = new FormGroup({
    genEmailId: new FormControl(0),
    genEmailAddress: new FormControl(''),
    EmpGmails: new FormArray([]),
   // empIds: new FormArray([]),
    // currentEmployees: new FormArray([]),
    // Employees: new FormArray([])
  });

  @ViewChild('search') search: any;

  emailTemp: any = {};
  public temp: GenaricEmailModel[] = [];
  public Emails: GenaricEmailModel[] = [];

  public columns: Array<object>;
  pageSize: number = 10;
  order: string = "info.name";
  reverse: boolean = false;
  sortedCollection: any[];
  SelectedEmails: GenaricEmailModel[] = [];
  Branchs: BranchsModel[] = [];
  Employees: EmployeeModel[] = [];
  EmployeesList: EmployeeModel[] = [];
  Companys: CompanyModel[] = [];
  
  constructor(
    private gmlSrv: GenaricemailService,
    private astTypeSrv: AssettypeService,
    private empSrv: EmployeeService,
    private brnSrv: BranchService,
    private comSrv: CompanyService,
    private expExcelSrv: ExportexcelService,
    private orderPipe: OrderPipe,
    private fb: FormBuilder,
  ) {
    this.sortedCollection = orderPipe.transform(this.Emails, 'astDescription');
    // console.log('sortedCollection....' , this.sortedCollection);
    // for (let i = 1; i <= this.Emails.length; i++) {
    //   this.Emails.push();
    // }
    this.onGetAllEmployees();
    this.onGetAllGenaricEmails();
    this.onGetAllBranchs();
    this.onGetAllCompanys();
}

  ngOnInit(): void {
    this.settings = {
      singleSelection: false,
      idField: 'empId',
      textField: "EmpData",
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 6,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
        this.onGetAllGenaricEmails();
        this.emailForm = this.fb.group({
          genEmailId: null,
          genEmailAddress: null,
          EmpGmails: this.fb.array([])
         // empIds: this.fb.array([])
          // Employees: this.fb.array([])
      });
  }
  // employee: EmployeeModel = { empId: 0, empFullName: '', Emails: []}
  onSubmit(): void {
 

    console.log(this.emailForm.value);
    

            //   this.employee.empId = this.emailForm.controls.empId.value;
            //   this.employee.empFullName = this.emailForm.controls.empFullName.value;
            //  this.employee.Emails = this.getEmployees.value;

              this.gmlSrv.assignEmployeestoGmail(this.emailForm.value).subscribe(gmail => {
                    
                    this.onGetAllGenaricEmails();
                    // this.emailForm.reset();
                    // this.onDeSelectAll();

              });
  }
  onCancel() {
    this.emailForm.reset();
 }
  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.astDescription.toLocaleLowerCase().indexOf(term) > -1 || 
    item.astCode.toLocaleLowerCase().indexOf(term) > -1;
  }
  createItem(item?: EmployeeModel): FormGroup {
    
    return this.fb.group({
      empId: item.empId,
      genEmailId: 999
      // empFullName: item.empFullName
      // EmployeeId: this.Emails.find(x => x.astId === item.astId).Employee.empId,
      // EmployeeName: this.Emails.find(x => x.astId === item.astId).Employee.empFullName
    });
  }
  createItemEmpId(item?: EmployeeModel): FormControl {
 //   
 var id = item.empId;
    return this.fb.control({
      id
    });
  }
  onChangeEmails(e) {
    
    const numberOfEmails = e.target.value || 0;
    if (this.getEmployees.length < numberOfEmails) {
        for (let i = this.getEmployees.length; i < numberOfEmails; i++) {
            this.getEmployees.push(this.fb.group({
                astCode: ['', Validators.required],
                astDescription: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.getEmployees.length; i >= numberOfEmails; i--) {
            this.getEmployees.removeAt(i);
        }
    }
  }
  onGetAllGenaricEmails() {
    //    
          this.gmlSrv.getAllGenaricemails().subscribe((mls: GenaricEmailModel[]) => {
            // console.log('this.Emails....' , this.Emails);
     //       
            this.Emails = mls;
            this.temp = mls;  // for search
            //  console.log('this.Emails....' , this.Emails);
            //  
           });
  }

  onGetAllEmployees() {
         
         this.empSrv.getAllEmployeesWithEmails().subscribe((emps: EmployeeModel[]) => {
          
            this.Employees = emps;
            console.log( ' this.Employees....' , this.Employees);
            debugger;
            this.EmployeesList = [];
          //  this.Employees = [];
            emps.forEach(e => {
              debugger;
                  var employee: EmployeeModel = { empId: 0, empFullName: '', DepartmentName: '', BranchName: '', CompanyName: '', EmpData: ''   };
                  employee.empId = e.empId;
                  employee.EmpData = "(" + e.empHRCode + " )" + e.DepartmentName + " - "  + e.empFullName  + ". "; 
                  if(employee.empFullName != null) {
                    this.EmployeesList.push(employee);
                 //   this.Employees.push(employee);
                  }
            });
         });
  }
  onGetAllBranchs() {
   //     
        this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
     //        
             this.Branchs = brns;
        });
  }
  onGetAllCompanys() {
    //    
          this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
            console.log(this.Companys);
            console.log(coms);
      //      
            this.Companys = coms;
           });
  }
  selectEmpEvent(event) {

    this.emailForm.controls['genEmailId'].setValue(event.genEmailId);
    this.emailForm.controls['genEmailAddress'].setValue(event.genEmailAddress);
  
  }

  onFilterByAssetType(e) {
  
    if(e.target.selectedOptions[0].text.toString() == '--All--') {
          this.onGetAllGenaricEmails();
    } else {
          //  this.onGetAllEmails();
          let val = e.target.selectedOptions[0].text.toString();
          
          // console.log(Object.keys(this.temp[0]).length);
          const value = val.toString().toLowerCase().trim();
          
          // get the amount of columns in the table
          const count = Object.keys(this.temp[0]).length;
          
          // get the key names of each column in the dataset
          const keys = Object.keys(this.temp[0]);
          
          // email filtered matches to the active datatable
          this.Emails = this.temp.filter(item => {
            
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

  }
  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    // this.setForm();
    // this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }
  public onFilterChange(item: any) {
    
    console.log(item);
    this.customSearchFn;
  }
  public onDropDownClose(item: any) {
    console.log(item);
  }
  public onItemSelect(item?: EmployeeModel) {
       
    console.log('item  .. ', item);
    this.getEmployees.push(this.createItem(item));
    // this.getAssetIds.push(new FormControl(item.astId));
    console.log('this.getEmailForm...' ,  this.getEmailForm);
    
  }
  public onDeSelect(item: any) {
    
    console.log(item);
    this.getEmployees.removeAt(item);
    }

  public onSelectAll(items: any) {
    
  
    // items.forEach(itm => {
    //   this.getEmpIds.push(this.createItemEmpId(itm));
    // });
    
   
    items.forEach(itm => {
      this.getEmpGmails.push(this.createItem(itm));
     
      console.log( 'this.getEmpGmails ...' , this.getEmpGmails);
      console.log( 'this.getEmpGmails.value ...' , this.getEmpGmails.value);
    });
  }
  public onDeSelectAll(items?: any) {
      this.getEmployees.value.forEach(itm => {
            this.getEmployees.removeAt(itm);
      });
  }
 
   onSelect(e, ast) {
     // 
     // console.log(e);
     if(e.target.checked)
     {
       this.SelectedEmails.push(ast);
       let allChecked = true;
       this.Emails.forEach((asset, index) => {
         var assetItemHTMLelemnt =     <HTMLInputElement> document.getElementById('assetItem--' + index);
         if(!assetItemHTMLelemnt.checked) allChecked = false;
         // console.log(this.SelectedEmails);
       });
       if(allChecked) 
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       assetItemALLHTMLelemnt.checked = true;
       // console.log('Selected Emails:  ' ,  this.SelectedEmails);
     }
     else if (!e.target.checked){
       var assetItemALLHTMLelemnt = <HTMLInputElement> document.getElementById("assetItemALL--");
       if(assetItemALLHTMLelemnt.checked) assetItemALLHTMLelemnt.checked = false;
       this.SelectedEmails.filter((asset, selectedIndex) => {
        //  if (asset.astId === ast.astId) {
        //    this.SelectedEmails.splice(selectedIndex, 1);
        //  }
       });
     }
     // console.log('Selected Emails:  ' ,  this.SelectedEmails);
     // console.log(' Emails:  ' ,  this.Emails);
     // 
   }
   onExportExcel() {
     this.expExcelSrv.exportAsExcelFile(this.SelectedEmails, 'Hello');
   }
   onPrintPreviewSelectedEmails() {
     // console.log(ast);
     // 
     // this.bsModaleRef = this.modalService.show(AddeditasstComponent, {initialState: {ast}});
     // this.bsModaleRef.content.onClose = (updated) => {
     //   if (updated) {
     //     this.onGetAllEmails();
     //     console.log('Edit clicked inside');
     //   }
     // };
     // console.log('Edit clicked');
   }
   setOrder(value: string) {
     
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
     const count = Object.keys(this.temp[0]).length;
     
     // get the key names of each column in the dataset
     const keys = Object.keys(this.temp[0]);
     
     // email filtered matches to the active datatable
     this.Emails = this.temp.filter(item => {
       
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
   }

   onGetCurrentEmails() {
    //  this.emailForm.patchValue(this.AssetTemp);
    //  this.emailForm.controls.AssetTypes.get('asttypName').patchValue(this.AssetTemp.AssetType.asttypName);

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
     // 
     // console.log(event);
     // console.log(event.target.value);
     this.pageSize = event.target.value;
   }

     // convenience getters for easy access to form fields
  // get getEmailFormTEST() { return this.emailForm; }
   get getEmailForm() { return this.emailForm.controls; }
   get getEmpIds() { return this.getEmailForm.empIds as FormArray; }
   get getEmployees() { return this.getEmailForm.Employees as FormArray; }
   get getEmpGmails() { return this.getEmailForm.EmpGmails as FormArray; }
   

 // get getAssetId() { return this.getEmployees.get('astId') as FormControl; }
  // get getAssetIds() { return this.getEmailForm.assetIds as FormArray; }


}
