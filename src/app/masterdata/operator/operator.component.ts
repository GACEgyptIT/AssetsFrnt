import { Component, OnInit } from '@angular/core';
import { OperatorModel } from 'app/shared/models/OperatorModel';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OperatorService } from './services/operator.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {


  public loading = false;
  notificationMessage = '';

  OperatorForm: FormGroup;

  public Operators: OperatorModel[] = [];

    constructor(
        private brnSrv: OperatorService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllOperators();
  
    }
    ngOnInit() {
      this.OperatorForm = this.fb.group({
        oprId: null,
        oprName: [null, Validators.required]
      });
    }

    onGetAllOperators() {
            this.loading = true;
            this.brnSrv.getAllOperators().subscribe((brns: OperatorModel[]) => {
                    this.Operators = brns;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(): void {
        if (!this.OperatorForm.value.oprId) {
          this.loading = true;
                this.brnSrv.addOperator(this.OperatorForm.value).subscribe(OperatorAdded => {
                      this.OperatorForm.reset();
                      this.loading = false;
                      this.alertService.success( 'Created successfully ');
                      this.onGetAllOperators();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger( 'Server error ');
                  }
                });

        } else if (this.OperatorForm.value.oprId) {
                this.brnSrv.editOperator(this.OperatorForm.value.oprId, this.OperatorForm.value).subscribe(OperatorAdded => {
                      this.OperatorForm.reset();
                      this.onGetAllOperators();
                      this.alertService.success( 'Changed successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger( 'Server error ');
                      }
                });
        }
    }
    onEditOperator(opr) {
        this.OperatorForm.reset();
        this.OperatorForm.patchValue(opr);
    }
    onDeleteOperator(opr : OperatorModel) {
        if(confirm("Are you sure to delete Operator " + opr.oprName)){
          this.brnSrv.deleteOperator(opr.oprId).subscribe((oprdlt: OperatorModel) => {
            this.alertService.success('Operator: ' +  oprdlt.oprName + ' deleted Successfully');
            this.onGetAllOperators();
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
