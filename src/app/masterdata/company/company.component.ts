import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';
import { CompanyService } from './services/company.service';
import { CompanyModel } from 'app/shared/models/CompanyModel';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  companyForm: FormGroup;

  public Companys: CompanyModel[] = [];

    constructor(
        private brnSrv: CompanyService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllCompanys();
  
    }
    ngOnInit() {
      this.companyForm = this.fb.group({
        comId: 0,
   //     comCode: [null, Validators.required],
        comName: [null, Validators.required]
      });
    }
    
    onGetAllCompanys() {
      //    debugger;
            this.loading = true;
            this.brnSrv.getAllCompanys().subscribe((coms: CompanyModel[]) => {
                    this.Companys = coms;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    status = '';
    setStatus(s){
      this.status = s;
    }
    onSubmit(): void {
        debugger;
        if (this.companyForm.value.comId == 0) {
        //  debugger;
          this.loading = true;
                this.brnSrv.addCompany(this.companyForm.value).subscribe(CompanyAdded => {
                      this.companyForm.reset();
                      this.companyForm.controls['comId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Cearted Successfully ');
                      this.onGetAllCompanys();                 
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.companyForm.value.comId > 0) {
                 debugger;
                this.brnSrv.editCompany(this.companyForm.value.comId, this.companyForm.value).subscribe(CompanyAdded => {
                      this.onGetAllCompanys();
                      this.companyForm.reset();
                      this.companyForm.controls['comId'].setValue(0);
                      this.alertService.success('Changed Successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditCompany(emp) {
    //  debugger;
        this.companyForm.reset();
        this.companyForm.patchValue(emp);
      //  this.companyForm.controls.CompanyTypes.get('emptypName').patchValue(emp.CompanyType.emptypName);

    }
    onDeleteCompany(emp : CompanyModel) {
        if(confirm("Are you sure to delete Company " + emp.comName)){
          debugger;
          this.brnSrv.deleteCompany(emp.comId).subscribe((empdlt: CompanyModel) => {

            this.alertService.success('Company: ' +  empdlt.comName + '  Deleted Successfully');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
          // this.alertService.success('this is a success alert');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllCompanys();

          }, error => {

            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('server error ');
            }
          });
        }
    }
    onCancel() {
       this.companyForm.reset();
 
    }
    
    get getCompanyForm() { return this.companyForm.controls; }



}
