import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { RegisterService } from '../register/service/register.service';
import { AlertService } from 'ngx-alerts';
//import { UserModel } from 'app/shared/models/UserModel';
import { EmployeeService } from 'app/masterdata/employee/services/employee.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { RoleModel } from 'app/shared/models/RoleModel';
import { RoleService } from '../role/services/role.service';
import { UsersModule } from '../users.module';
import { ActivatedRoute } from '@angular/router';
import { CustomvalidatorsService } from 'app/shared/services/customvalidators.service';
import Sha3 from '../../shared/JS/sha.js';
import { OrderPipe } from 'ngx-order-pipe';
import { DepartmentService } from 'app/masterdata/department/services/department.service';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { BranchService } from 'app/masterdata/branch/services/branch.service';
import { AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { ViewChild } from '@angular/core';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { CompanyService } from 'app/masterdata/company/services/company.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
//  [x: string]: any;

  sortedCollection: any[];
  public settings = {};
  userForm: FormGroup; 
  searchForm: FormGroup;
  public config = {};
  EncryptedPassword: string = '';
  EncryptedPasswordConfirm: string = '';
  options = <object>{};
  public loading = false;
  notificationMessage = '';
  pageIndex: number = 1;
  public Users: EmployeeModel[] = [];
  public Roles: RoleModel[] = [];
  public Employees: EmployeeModel[] = [];
  public temp: EmployeeModel[] = [];
  public Departments: DepartmentModel[] = [];
  public Branches: BranchsModel[] = [];
  public Companys: CompanyModel[] = [];
  public UsersAccounts: any[] = [];
  @ViewChild('search') search: any;
  
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    // 
    if (c.get('password').value !== c.get('confirm_password').value) {
      // debugger
        return {invalid: true};
    }
  }
  MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirm_password').value;
    if (password != confirmPassword) {
      control.get('confirm_password').setErrors({ confirm_password: true });
    }
    else {
      return null;
    }
  }

    constructor(
        private valdSrv: CustomvalidatorsService,
        private regSrv: RegisterService,
        private rolSrv: RoleService,
        private fb: FormBuilder,
        private alertService: AlertService,
        private empSrv: EmployeeService,
        private comSrv: CompanyService,
        private route: ActivatedRoute,
        private orderPipe: OrderPipe,
        private dptSrv: DepartmentService,
        private brnSrv: BranchService
      ) {
        this.settings = {
          singleSelection: false,
          idField: 'roleId',
          textField: "roleName",
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
        this.sortedCollection = orderPipe.transform(this.Roles, 'roleName');

    }

    ngOnInit() {
      this.buildSearchForm();
      Sha3.options;
      this.userForm = this.fb.group({
        empId: null,
        EmpImg: null,
        dptId: null,
        brnId: null,
        empFullName: [ null, Validators.required],
        accountName: [ null, Validators.required],
        usrPassword: [ null, [Validators.required]],
        confirmUsrPassword: [ null, [Validators.required]],
        Roles: this.fb.array([])
        }, {
          validator: this.valdSrv.MustMatch('usrPassword', 'confirmUsrPassword')
        });
        this.onGetAllEmployees();
        this.onGetAllDepartments();
        this.onGetAllCompanys();
        this.onGetAllBranches();
        this.onGetAllRoles();
     //   this.userForm.reset();
      // this.route.queryParams.subscribe(params => {
      //       debugger;
      //       if(params != {}){
      //         this.userForm.get('empId').setValue(params.empId);
      //         this.userForm.get('EmpImg').setValue(params.EmpImg);
      //         this.userForm.get('empFullName').setValue(params.empFullName);
      //         this.userForm.get('accountName').setValue(params.accountName);
      //     //    this.userForm.get('Roles').setValue(params.Roles);
      //       }
      // });
      this.config = {
        displayKey: "accountName", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
        customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
        clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
        inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
      }
    }

    passwordEncrypt(){
   //   debugger; 
         this.EncryptedPassword = Sha3.keccak1600(1088, 512, this.userForm.get('usrPassword').value, this.options); 
         this.EncryptedPasswordConfirm = Sha3.keccak1600(1088, 512, this.userForm.get('confirmUsrPassword').value, this.options); 
         this.userForm.get('usrPassword').patchValue(this.EncryptedPassword);
         this.userForm.get('confirmUsrPassword').patchValue(this.EncryptedPasswordConfirm);
      //   debugger; 
    }
      /////////// Filters ////////////////////
      buildSearchForm(): void {
        this.searchForm = this.fb.group({
          DepartmentName: new FormControl(''),
          BranchName: new FormControl(''),
          CompanyName: new FormControl('')
        });
      }
      searchFilter(filters: any): void {
        this.loading = true;
        debugger; 
        this.empSrv.getAllEmployeesWithAssets().subscribe((employees: EmployeeModel[]) => {
              debugger;
              this.Employees = [];
              this.Employees = employees;
  
              Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
              const keys = Object.keys(filters);
              const filterEmps = invoice => keys.every(key => invoice[key] === filters[key]);     
              const emps = this.Employees.filter(filterEmps);
              this.Employees = emps;
              this.loading = false;
           //   this.onUpdatestatistics();
              this.pageIndex = 1;
        });
      }
      ngAfterViewInit(): void {
      debugger; 
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
         updateFilter(val: any) {
          debugger; 
          // console.log(Object.keys(this.temp[0]).length);
          const value = val.toString().toLowerCase().trim();
          // get the amount of columns in the table
          const count = Object.keys(this.temp[0]).length;
          // get the key names of each column in the dataset
          const keys = Object.keys(this.temp[0]);
          // assign filtered matches to the active datatable
          this.Employees = this.temp.filter(item => {
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
      /////////////////////////////
    fileChangeListener(event) {
      debugger;
      let me = this;
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      //this.userForm.get('EmpImg').setValue(reader.result);
      reader.onload = () => {
        debugger;
     //   this.userForm.get('EmpImg').setValue(reader.result);
     this.getEmpImg.patchValue(reader.result);
        debugger;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    onGetAllUsers() {
            this.loading = true;
            this.regSrv.getAllUsers().subscribe((usrs: EmployeeModel[]) => {
                    this.Users = usrs;
                    this.loading = false;
              }, error => {
                    console.log('error ...' ,  error.message);
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                    }
            });
    }
    onGetAllRoles() {
      //debugger;
        this.loading = true;
        this.rolSrv.getAllRoles().subscribe((res: RoleModel[]) => {
          debugger;
                this.Roles = res;
                this.loading = false;
          }, error => {
                console.log('error ...' ,  error.message);
                this.loading = false;
                if(error.message.includes('Http failure response for http://')) {

                }
        });
    }
    onGetAllEmployees() {
            this.loading = true;
            this.empSrv.getAllEmployeesWithEmails().subscribe((emps: EmployeeModel[]) => {
             debugger;
                    this.Employees = emps;
                    this.temp = emps;
                    this.loading = false;
            }, err=>{
              this.alertService.danger('Server error');
            });
    }
    ImportADEmployees() {
        this.empSrv.ImportADEmployees().subscribe((emps: [{ accountName: ''}]) => {
                 emps.forEach(e => {
                    this.UsersAccounts.push(e)
                 });
      });
    }
    onGetAllDepartments() {
      this.dptSrv.getAllDepartments().subscribe((dpts: DepartmentModel[]) => {
             this.Departments = dpts;
      });
    }
    onGetAllCompanys() {
      this.loading = true;
      this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
              this.Companys = coms;
       }, error => {
              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error');
              }
      });
    }
    
    onGetAllBranches() {
      this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
             this.Branches = brns;
      });
    }

    selectionChanged(e) {
        console.log(e);
    }
    onSubmit(): void {
      debugger;
        this.passwordEncrypt();
        if (this.getUserId.value == null) {
          this.loading = true;
                debugger;
                this.regSrv.addUser(this.userForm.value).subscribe(UserAdded => {
                      debugger;
                      this.userForm.reset();
                      this.route.queryParams.subscribe(params => {
                        debugger;
                        params = {};
                      });
                      this.alertService.success('Created Successfully');
                      this.onGetAllEmployees();
                      this.loading = false;
                }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
                });
        } else if (this.getUserId.value != null) {
                debugger;
                this.empSrv.createEmployeeUser(this.userForm.value.empId, this.userForm.value).subscribe((res: EmployeeModel) => {
                      debugger; 
                     
                      this.alertService.success('Changed Successfully');
                      this.loading = false; 
                      debugger; 
                      this.userForm.reset();
                      this.route.queryParams.subscribe(params => {
                        debugger;
                        params = {};
                      });
                      this.onGetAllEmployees();

                }, error => {
                      debugger;  
                      console.log('Data is not Imported ...' ,  error.message);
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('server error');
                      }
                });
         
        }
    }
    onEditUser(usr: EmployeeModel) {
      debugger;
        this.userForm.reset();
        this.userForm.patchValue(usr);
        this.getUserPasswordGroup.patchValue(null);
        this.getconfirmUsrPassword.patchValue(null);
     //   this.getUserPasswordGroup.patchValue(false);
      
    }
    onDeleteUser(e : EmployeeModel) {
    ///  debugger;
        if(confirm("Are you sure to delete User " + e.empFullName)){
          this.regSrv.deleteUser(e.empId).subscribe((domdlt: EmployeeModel) => {
            this.loading = false;
            this.alertService.success('Deleted Successfully');
            this.onGetAllEmployees();
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
       this.userForm.reset();
    }
    onChangeRoled(e) {
      this.userForm.get('rolId').setValue(e.target.value);
    }
    public onFilterChange(item: any) {
      //console.log(item);
      this.customSearchFn;
    }
    public onDropDownClose(item: any) {
      //console.log(item);
    }
    public onItemSelect(item?: RoleModel) {
      this.getRoles.push(this.createItem(item)); 
    }
    public onDeSelect(item: any) {
      
      //console.log(item);
      this.getRoles.removeAt(item);
    }
    public onSelectAllRoles(items: any) {
      items.forEach(itm => {
        this.getRoles.push(this.createItem(itm));
      });
    }
    onDeSelectAll(items?: any) {
        this.getRoles.value.forEach(itm => {
              this.getRoles.removeAt(itm);
        });
    }

    createItem(item?: RoleModel): FormGroup {
      return this.fb.group({
        roleId: item.roleId,
        roleName: item.roleName
      })
    }
    customSearchFn(term: string, item: any) {
      term = term.toLocaleLowerCase();
      return item.roleName.toLocaleLowerCase().indexOf(term) > -1 || 
      item.roleName.toLocaleLowerCase().indexOf(term) > -1;
    }

    onChangeDepartmentId(e) {
      // 
      this.userForm.get('dptId').setValue(e.target.value);
    }
    onChangeBranchId(e) {
      // 
      this.userForm.get('brnId').setValue(e.target.value);
    }
    
    get getUserForm() { return this.userForm.controls; }
    get getUserPasswordGroup() { return this.userForm.get('usrPassword') as FormGroup; }
    get getconfirmUsrPassword() { return this.userForm.get('confirmUsrPassword') as FormGroup; }      ///////// test confirmUsrPassword
    get getUserPassword() { return this.getUserPasswordGroup.get('password') as FormControl; }
    get getUserConfirmPassword() { return this.getUserPasswordGroup.get('confirm_password') as FormControl; }
    get getEmpImg() { return this.userForm.get('EmpImg') as FormControl; }
    get getUserId() { return this.userForm.get('empId') as FormControl; }

    get getRoles() { return this.getUserForm.Roles as FormArray; }

}
