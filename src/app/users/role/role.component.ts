import { Component, OnInit } from '@angular/core';
import { RoleModel } from 'app/shared/models/RoleModel';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { RoleService } from './services/role.service';
import { AlertService } from 'ngx-alerts';
import { PrivilegeModel } from 'app/shared/models/PrivilegeModel';
import { PrivilegeService } from '../privilege/service/privilege.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public loading = false;
  notificationMessage = '';
  Privileges: PrivilegeModel[] = [];
  public settings = {};
  roleForm: FormGroup;
  Roles: RoleModel[] = [];

    constructor(
        private rolSrv: RoleService,
        private privSrv: PrivilegeService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {

        this.roleForm = this.fb.group({
          roleId: 0,
          roleName: [null, Validators.required],

          RolePrivileges: this.fb.array([])
        });
       // this.onGetAllRoles();
        this.onGetAllPrivileges();
        this.fillRoles();
    }
    ngOnInit() {
      this.settings = {
        singleSelection: false,
        idField: 'PrivilegeId',
        textField: "PrivilegeName",
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
    }
    
    onSelectRolesTemplate(e){
       if(e.target.value == "Roles"){
         this.onGetAllRoles();
       } if(e.target.value == "Templates"){
         this.fillRoles();
       }
    }
    fillRoles(){
      
      this.Roles = [
 
        {roleId: 0 , roleName: 'User', Privileges: [] },
        {roleId: 0 , roleName: 'HeadDept', Privileges: [] },
        {roleId: 0 , roleName: 'OfficeMngr', Privileges: [] },
        {roleId: 0 , roleName: 'IT', Privileges: [] },
        {roleId: 0 , roleName: 'Admin', Privileges: [] },
        {roleId: 0 , roleName: 'BranchAdmin', Privileges: [] },
        {roleId: 0 , roleName: 'BranchManager', Privileges: [] },
        {roleId: 0 , roleName: 'GM', Privileges: [] },

      ];
    }
    onGetAllRoles() {
            this.loading = true;
            this.rolSrv.getAllRoles().subscribe((rls: RoleModel[]) => {
              if(rls.length == 0){
                this.alertService.success('No Role in DB to Import');
              } else{
                this.alertService.success('( ' + rls.length + ' ) Roles Imported successfully from DB');
              }
          
                    this.Roles = rls;
                    this.loading = false;
              }, error => {
                    console.log('error ...' ,  error.message);
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }   
    onGetAllPrivileges() {
            this.loading = true;
            this.privSrv.getAllPrivileges().subscribe((rls: PrivilegeModel[]) => {
                    this.Privileges = rls;
                    this.loading = false;
              }, error => {
                    console.log('error ...' ,  error.message);
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }
    onSubmit(status): void {
        if (this.roleForm.value.roleId == 0) {
          this.loading = true;
                this.rolSrv.addRole(this.roleForm.value).subscribe((RoleAdded: RoleModel) => {
                  if (status == 'Add') {
                      this.roleForm.reset();
                      this.roleForm.controls['roleId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Role: ' +  RoleAdded.roleName + ' Created successfully');
                      this.onGetAllRoles();
                  } else if (status == 'Save') {
                    this.alertService.success('Role: ' +  RoleAdded.roleName + ' Saved successfully');
                     this.loading = false;
                     this.onGetAllRoles();
                     window.location.reload();
                  };
                 
                }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
                });

        } else if (this.roleForm.value.roleId > 0) {
                 
                this.rolSrv.editRole(this.roleForm.value.roleId, this.roleForm.value).subscribe(RoleAdded => {
                      this.roleForm.reset();
                      this.roleForm.controls['roleId'].setValue(0);
                      this.onGetAllRoles();
                      window.location.reload();
                }, error => {
                      console.log('Data is not Imported ...' ,  error.message);
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error');
                      }
                });
         
        }
    }
    onEditRole(rol: RoleModel) {
        
        this.roleForm.reset();
        this.roleForm.patchValue(rol);
        // rol.RolePrivileges.forEach(p =>{
        //   
        //   this.onItemSelect(p.Privilege);
        // });
    }
    onDeleteRole(rol: RoleModel) {
        if(confirm("Are you sure to delete Role " + rol.roleName)){
          
          this.rolSrv.deleteRole(rol.roleId).subscribe((roldlt: RoleModel) => {

        //  this.alertService.danger('Role: ' +  rol.roleName + ' is deleted');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
           this.alertService.success('Deleted Successfully');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllRoles();

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
       this.roleForm.reset();
    }
    public onFilterChange(item: any) {
      console.log(item);
      this.customSearchFn;
    }
    customSearchFn(term: string, item: any) {
      term = term.toLocaleLowerCase();
      return item.astDescription.toLocaleLowerCase().indexOf(term) > -1 || item.astCode.toLocaleLowerCase().indexOf(term) > -1;
    }
    public onDropDownClose(item: any) {
      console.log(item);
    }
    public onItemSelect(item?: PrivilegeModel) {
      
      console.log('item  .. ', item);
      this.getPrivilegess.push(this.createItem(item));
   
      console.log('this.getRoleForm...' ,  this.getRoleForm);
      
    }
    public onDeSelect(item: any) {
      
      console.log(item);
      this.getPrivilegess.removeAt(item);
    }
    public onSelectAll(items: any) {
      
      console.log(items);
      items.forEach(itm => {
       this.getPrivilegess.push(this.createItem(itm));
      });
    }
    public onDeSelectAll(items?: any) {
        // this.getAssets.value.forEach(itm => {
        //       this.getAssets.removeAt(itm);
        // });
    }
    createItem(item?: PrivilegeModel): FormGroup {
      
      return this.fb.group({
        Id: null,
        RoleId: this.roleForm.get('roleId').value,
        PrivilegeId: item.PrivilegeId,
        PrivilegeName: item.PrivilegeName

      });
    }
    
    get getRoleForm() { return this.roleForm.controls; }
    get getPrivilegess() { return this.getRoleForm.RolePrivileges as FormArray; }



}
