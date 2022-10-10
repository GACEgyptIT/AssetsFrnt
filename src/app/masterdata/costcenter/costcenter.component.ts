import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';
import { CostCenterModel } from 'app/shared/models/CostCenterModel';
import { CostcenterService } from './Services/costcenter.service';


@Component({
  selector: 'app-cost-center',
  templateUrl: './costcenter.component.html',
  styleUrls: ['./costcenter.component.css']
})
export class CostCenterComponent implements OnInit {


  public loading = false;
  notificationMessage = '';

  costcenterForm: FormGroup;

  public costcenters: CostCenterModel[] = [];

    constructor(
        private brnSrv: CostcenterService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.getCostCentersByEmpId();
  
    }
    ngOnInit() {
      this.costcenterForm = this.fb.group({
        CostCenterId: null,
     //   costcenterCode: [null, Validators.required],
        ccName: [null, Validators.required]
      });
    }
    
    getCostCentersByEmpId() {
      //    
            this.loading = true;
            this.brnSrv.getCostCentersByEmpId().subscribe((coms: CostCenterModel[]) => {
                    this.costcenters = coms;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }
    onSubmit(status): void {
        
        if (this.costcenterForm.value.CostCenterId == null) {
          this.loading = true;
                this.brnSrv.addCostCenter(this.costcenterForm.value).subscribe(costcenterAdded => {
                      this.loading = false;
                      this.costcenterForm.reset();
                      this.costcenterForm.get('CostCenterId').setValue(null);
                      this.alertService.success('Created Successfully');
                      this.getCostCentersByEmpId();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
                });

        } else if (this.costcenterForm.value.CostCenterId > 0) {
                 
                this.brnSrv.editCostCenter(this.costcenterForm.value.CostCenterId, this.costcenterForm.value).subscribe(costcenterAdded => {
                      this.loading = false;
                      this.costcenterForm.reset();
                      this.getCostCentersByEmpId();
                      this.alertService.success('Chaned Successfully');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error');
                      }
                });
         
        }
    }
    onEditcostcenter(cc) {
    //  
        this.costcenterForm.reset();
        this.costcenterForm.patchValue(cc);
      //  this.costcenterForm.controls.costcenterTypes.get('cstypName').patchValue(cs.costcenterType.cstypName);

    }
    onDeletecostcenter(cc : CostCenterModel) {
        if(confirm("Are you sure to delete costcenter " + cc.ccName)){
          
          this.brnSrv.deleteCostCenter(cc.CostCenterId).subscribe((csdlt: CostCenterModel) => {

           // this.alertService.danger('costcenter: ' +  csdlt.ccName + ' is deleted');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
           this.alertService.success('Deleted Successfully');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.getCostCentersByEmpId();

          }, error => {

            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.costcenterForm.reset();
 
    }
    
    get getcostcenterForm() { return this.costcenterForm.controls; }



}
