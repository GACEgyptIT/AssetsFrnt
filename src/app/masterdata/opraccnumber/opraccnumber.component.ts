import { Component, OnInit } from '@angular/core';
import { OprAccNumberModel } from 'app/shared/models/OprAccNumberModel';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OpraccnumberService } from './service/opraccnumber.service';
import { AlertService } from 'ngx-alerts';
import { OperatorModel } from 'app/shared/models/OperatorModel';
import { OperatorService } from '../operator/services/operator.service';

@Component({
  selector: 'app-opraccnumber',
  templateUrl: './opraccnumber.component.html',
  styleUrls: ['./opraccnumber.component.css']
})
export class OpraccnumberComponent implements OnInit {
  public loading = false;
  notificationMessage = '';

  AccountNumberForm: FormGroup;
  Operators: OperatorModel[] = [];
  AccountsNumbers: OprAccNumberModel[] = [];

    constructor(
      private mainoprSrv: OperatorService,
        private opraccSrv: OpraccnumberService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllAccounts();
        this.onGetAllOperators();
  
    }
    ngOnInit() {
      this.AccountNumberForm = this.fb.group({
        OprAccNumberId: null,
        OprAccNumberName: [null, Validators.required],
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
    onGetAllAccounts() {
            this.loading = true;
            this.opraccSrv.getAllOprAccNumbers().subscribe((brns: OprAccNumberModel[]) => {
              debugger;
                    this.AccountsNumbers = brns;
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
        if (this.AccountNumberForm.value.OprAccNumberId == null) {
          this.loading = true;
                this.opraccSrv.addOprAccNumbers(this.AccountNumberForm.value).subscribe(OperatorAdded => {
                      this.AccountNumberForm.reset();
                      this.loading = false;
                      this.alertService.success( 'Created successfully ');
                      this.onGetAllAccounts();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger( 'Server error ');
                  }
                });

        } else if (this.AccountNumberForm.value.OprAccNumberId != null) {
                this.opraccSrv.editOprAccNumbers(this.AccountNumberForm.value.oprId, this.AccountNumberForm.value).subscribe(OperatorAdded => {
                      this.AccountNumberForm.reset();
                      this.onGetAllAccounts();
                      this.alertService.success( 'Changed successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger( 'Server error ');
                      }
                });
        }
    }
    onEditOperator(opr: OprAccNumberModel) {
        this.AccountNumberForm.reset();
        this.AccountNumberForm.patchValue(opr);
        this.AccountNumberForm.get('oprId').patchValue(opr.oprId);
        debugger;
    }
    onDeleteOperator(opr : OprAccNumberModel) {
        if(confirm("Are you sure to delete Account Number " + opr.OprAccNumberName)){
          this.opraccSrv.deleteOprAccNumbers(opr.OprAccNumberId).subscribe((oprdlt: OprAccNumberModel) => {
            this.alertService.success('Account Number: ' +  oprdlt.OprAccNumberName + ' deleted Successfully');
            this.onGetAllAccounts();
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
       this.AccountNumberForm.reset();
 
    }
    
    get getOperatorForm() { return this.AccountNumberForm.controls; }



}
