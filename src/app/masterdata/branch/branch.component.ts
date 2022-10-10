import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { BranchService } from './services/branch.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  branchForm: FormGroup;

  public Branchs: BranchsModel[] = [];

    constructor(
        private brnSrv: BranchService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllBranchs();
  
    }
    ngOnInit() {
      this.branchForm = this.fb.group({
        brnId: 0,
   //     brnCode: [null, Validators.required],
        brnName: [null, Validators.required]
      });
    }
    
    onGetAllBranchs() {
      //    
            this.loading = true;
            this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[]) => {
                    this.Branchs = brns;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(): void {
        
        if (this.branchForm.value.brnId == 0) {
        //  
          this.loading = true;
                this.brnSrv.addBranch(this.branchForm.value).subscribe(BranchAdded => {
                      this.branchForm.reset();
                      this.branchForm.controls['brnId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Created Successfully ');
                      this.onGetAllBranchs();       
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.branchForm.value.brnId > 0) {
                 
                this.brnSrv.editBranch(this.branchForm.value.brnId, this.branchForm.value).subscribe(BranchAdded => {
                      this.branchForm.reset();
                      this.branchForm.controls['brnId'].setValue(0);
                      this.onGetAllBranchs();
                      this.alertService.success('Chnaged Successfully ');
                }, error => {
   
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditBranch(emp) {
    //  
        this.branchForm.reset();
        this.branchForm.patchValue(emp);
      //  this.branchForm.controls.BranchTypes.get('emptypName').patchValue(emp.BranchType.emptypName);

    }
    onDeleteBranch(emp : BranchsModel) {
        if(confirm("Are you sure to delete Branch " + emp.brnName)){
          
          this.brnSrv.deleteBranch(emp.brnId).subscribe((empdlt: BranchsModel) => {

            this.alertService.success('Deleted Successfully');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
          // this.alertService.success('this is a success alert');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllBranchs();

          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.branchForm.reset();
 
    }
    
    get getBranchForm() { return this.branchForm.controls; }


}
