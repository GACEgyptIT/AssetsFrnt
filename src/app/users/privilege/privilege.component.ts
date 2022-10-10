import { Component, OnInit } from '@angular/core';
import { PrivilegeModel } from 'app/shared/models/PrivilegeModel';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PrivilegeService } from './service/privilege.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  privilegeForm = new FormGroup({
      PrivilegeId: new FormControl(0),
      PrivilegeName:  new FormControl('')
  });

  Privileges: PrivilegeModel[];
  PrivilegesDB: PrivilegeModel[];

    constructor(
        private alrtSrv: AlertService,
        private privSrv: PrivilegeService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {

        this.onGetAllPrivileges();

  
    }
    ngOnInit() {

      this.privilegeForm = this.fb.group({
        PrivilegeId: 0,
        PrivilegeName: [null, Validators.required]
      });
    }
    fillPrivs(){
      
      this.Privileges = [

        {Page: 'Approvals' , PrivilegeName: '/purchasing/approval' },
        {Page: 'Mng Invoices' , PrivilegeName: '/operation/invoicemng' },
        {Page: 'Mng Emails' , PrivilegeName: '/operation/emailmng' },
        {Page: 'Requests' , PrivilegeName: '/operation/requests' },
        {Page: 'Assets Transfer' , PrivilegeName: '/operation/assetmng' },
        {Page: 'Users List' , PrivilegeName: '/users/user' },
        {Page: 'Roles' , PrivilegeName: '/users/roles' },
        {Page: 'privilege' , PrivilegeName: '/users/privilege' },
        {Page: 'Operators' , PrivilegeName: '/masterdata/operator' },
        {Page: 'Assets Tracking' , PrivilegeName: '/masterdata/assettrackinglog' },
        {Page: 'Assets Upload' , PrivilegeName: '/masterdata/assetsupload' }, 
        {Page: 'Assets Creation' , PrivilegeName: '/masterdata/assets' }, 
        {Page: 'Assets Creation' , PrivilegeName: '/masterdata/assettype' },
        {Page: 'Employee' , PrivilegeName: '/masterdata/employee' },
        {Page: 'Import Employees' , PrivilegeName: '/masterdata/employeeimport' },
        {Page: 'Branch' , PrivilegeName: '/masterdata/branch' },
        {Page: 'Company' , PrivilegeName: '/masterdata/company' },
        {Page: 'Domain' , PrivilegeName: '/masterdata/domain' },
        {Page: 'Supplier' , PrivilegeName: '/masterdata/supplier' },
        {Page: 'Genaric Email' , PrivilegeName: '/masterdata/genaricemail' },
        {Page: 'Postion' , PrivilegeName: '/masterdata/position' },
        {Page: 'Department' , PrivilegeName: '/masterdata/department' },
        {Page: 'Item Category' , PrivilegeName: '/masterdata/itemscategory' },
        {Page: 'Cost Center' , PrivilegeName: '/masterdata/CostCenter' }
      ];
    }
    onGetAllPrivileges() {
            this.loading = true;
            this.privSrv.getAllPrivileges().subscribe((rls: PrivilegeModel[]) => {
                    this.PrivilegesDB = rls;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alrtSrv.danger('Server error');
                    }
            });
    }
    onSubmit(status): void {
        if (this.privilegeForm.value.PrivilegeId == 0) {
          this.loading = true;
                this.privSrv.addPrivilege(this.privilegeForm.value).subscribe(PrivilegeAdded => {
                  this.alrtSrv.success('Privilages updated Successfully');
                      this.privilegeForm.reset();
                      this.privilegeForm.controls['PrivilegeId'].setValue(0);
                      this.loading = false;
                      this.onGetAllPrivileges();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alrtSrv.danger('Server error');
                  }
                });
        } else if (this.privilegeForm.value.PrivilegeId > 0) {
                this.privSrv.editPrivilege(this.privilegeForm.value.PrivilegeId, this.privilegeForm.value).subscribe(PrivilegeAdded => {
                      this.privilegeForm.reset();
                      this.privilegeForm.controls['PrivilegeId'].setValue(0);
                      this.onGetAllPrivileges();
                }, error => {
                      console.log('Data is not Imported ...' ,  error.message);
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alrtSrv.danger('Server error');
                      }
                });
         
        }
    }
    onDBUpdate(){
      this.fillPrivs();
      this.privSrv.addMultiplePrivilege(this.Privileges).subscribe((res: PrivilegeModel[])=>{
        debugger;
        this.alertService.success('Privileges ( ' +  res.length + '  ) Updated Successfully ');
        this.onGetAllPrivileges();
      }, err => {
          this.alrtSrv.danger('Server Error');
      })
    }
    onEditPrivilege(rol) {
        this.privilegeForm.reset();
        this.privilegeForm.patchValue(rol);
    }
    onDeletePrivilege(rol : PrivilegeModel) {
        if(confirm("Are you sure to delete Privilege " + rol.PrivilegeName)){
          this.privSrv.deletePrivilege(rol.PrivilegeId).subscribe((roldlt: PrivilegeModel) => {
            this.alertService.success('Privilege: ' +  rol.PrivilegeName + ' is deleted');
            this.onGetAllPrivileges();
          }, error => {
            console.log('Data is not Imported ...' ,  error.message);
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alrtSrv.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.privilegeForm.reset();
    }
    
    get getPrivilegeForm() { return this.privilegeForm.controls; }


}
