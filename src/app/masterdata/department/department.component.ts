import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';

import { DepartmentModel } from 'app/shared/models/DepartmentModel';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  departmetForm = new FormGroup({
      dptId: new FormControl(0),
      dptName:  new FormControl(''),
   //   dptCode:  new FormControl('')
  });

  public Departments: DepartmentModel[] = [];

    constructor(
        private brnSrv: DepartmentService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllDepartments();
  
    }
    ngOnInit() {
      this.departmetForm = this.fb.group({
        dptId: 0,
        dptName: [null, Validators.required]
     //   dptCode: [null, Validators.required],
      });
    }
    
    onGetAllDepartments() {
    debugger;
            this.loading = true;
            this.brnSrv.getAllDepartments().subscribe((brns: DepartmentModel[]) => {
              debugger;
                    this.Departments = brns;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }
    onSubmit(): void {
        
        if (this.departmetForm.value.dptId == 0) {
        //  
          this.loading = true;
                this.brnSrv.addDepartment(this.departmetForm.value).subscribe(DepartmentAdded => {
                      this.departmetForm.reset();
                      this.departmetForm.controls['dptId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Operator Created Successfully');
                      this.onGetAllDepartments();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
                });

        } else if (this.departmetForm.value.dptId > 0) {
                 
                this.brnSrv.editDepartment(this.departmetForm.value.dptId, this.departmetForm.value).subscribe(DepartmentAdded => {
                      this.departmetForm.reset();
                      this.departmetForm.controls['dptId'].setValue(0);
                      this.onGetAllDepartments();
                      this.alertService.success('Changed Successfully');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error');
                      }
                });
         
        }
    }
    onEditDepartment(emp) {
        this.departmetForm.reset();
        this.departmetForm.patchValue(emp);
    }
    onDeleteDepartment(emp : DepartmentModel) {
        if(confirm("Are you sure to delete Department " + emp.dptName)){
          
          this.brnSrv.deleteDepartment(emp.dptId).subscribe((empdlt: DepartmentModel) => {
            this.alertService.success('Department: ' +  empdlt.dptName + ' Deleted Successfully');
            this.onGetAllDepartments();
          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.departmetForm.reset();
 
    }
    
    get getDepartmentForm() { return this.departmetForm.controls; }



}
