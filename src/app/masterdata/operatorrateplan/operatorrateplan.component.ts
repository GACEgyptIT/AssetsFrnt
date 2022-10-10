import { Component, OnInit } from '@angular/core';
import { OperatorRatePlanModel } from 'app/shared/models/OperatorRatePlanModel';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OperatorrateplanService } from './service/operatorrateplan.service';
import { AlertService } from 'ngx-alerts';
import { OperatorModel } from 'app/shared/models/OperatorModel';
import { OperatorService } from '../operator/services/operator.service';

@Component({
  selector: 'app-operatorrateplan',
  templateUrl: './operatorrateplan.component.html',
  styleUrls: ['./operatorrateplan.component.css']
})
export class OperatorrateplanComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  OperatorForm: FormGroup;
  Operators: OperatorModel[] = [];
  Plans: OperatorRatePlanModel[] = [];

    constructor(
      private mainoprSrv: OperatorService,
        private oprSrv: OperatorrateplanService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllPlans();
        this.onGetAllOperators();
  
    }
    ngOnInit() {
      this.OperatorForm = this.fb.group({
        OperatorRatePlanId: null,
        OperatorRatePlanName: [null, Validators.required],
        oprId: [null, Validators.required]
      });
    }
    onGetAllOperators() {
      this.loading = true;
      this.mainoprSrv.getAllOperators().subscribe((brns: OperatorModel[]) => {
        debugger;
              this.Operators = brns;
              this.loading = false;
        }, error => {
              this.loading = false;
              if(error.message.includes('Http failure response for http://')) {
                this.alertService.danger('Server error ');
              }
      });
    }
    onGetAllPlans() {
            this.loading = true;
            this.oprSrv.getAllOperatorRatePlans().subscribe((brns: OperatorRatePlanModel[]) => {
              debugger;
                    this.Plans = brns;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(): void {
      debugger;
        if (this.OperatorForm.value.OperatorRatePlanId == null) {
          this.loading = true;
                this.oprSrv.addOperatorRatePlans(this.OperatorForm.value).subscribe(OperatorAdded => {
                      this.OperatorForm.reset();
                      this.loading = false;
                      this.alertService.success( 'Created successfully ');
                      this.onGetAllPlans();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger( 'Server error ');
                  }
                });

        } else if (this.OperatorForm.value.OperatorRatePlanId != null) {
                this.oprSrv.editOperatorRatePlans(this.OperatorForm.value.oprId, this.OperatorForm.value).subscribe(OperatorAdded => {
                      this.OperatorForm.reset();
                      this.onGetAllPlans();
                      this.alertService.success( 'Changed successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger( 'Server error ');
                      }
                });
        }
    }
    onEditOperator(opr: OperatorRatePlanModel) {
        this.OperatorForm.reset();
        this.OperatorForm.patchValue(opr);
        this.OperatorForm.get('oprId').patchValue(opr.oprId);
        debugger;
    }
    onDeleteOperator(opr : OperatorRatePlanModel) {
        if(confirm("Are you sure to delete Plan " + opr.OperatorRatePlanName)){
          this.oprSrv.deleteOperatorRatePlans(opr.OperatorRatePlanId).subscribe((oprdlt: OperatorRatePlanModel) => {
            this.alertService.success('Plan: ' +  oprdlt.OperatorRatePlanName + ' deleted Successfully');
            this.onGetAllPlans();
          }, error => {
            console.log('Data is not Imported ...' ,  error.message);
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger( 'Server error ');
            }
          });
        }
    }
    onCancel() {
       this.OperatorForm.reset();
 
    }
    
    get getOperatorForm() { return this.OperatorForm.controls; }


}
