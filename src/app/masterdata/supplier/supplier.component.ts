import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { SupplierService } from './service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {


  public loading = false;
  notificationMessage = '';

  SupplierForm: FormGroup;

  public Suppliers: SupplierModel[] = [];

    constructor(
        private alrtSrv: AlertService,
        private splSrv: SupplierService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.SupplierForm = this.fb.group({
          splId: null,
          splName: [ null, Validators.required ]
        });
        this.onGetAllSuppliers();
  
    }
    ngOnInit() {

    }
    
    onGetAllSuppliers() {
            this.loading = true;
            this.splSrv.getAllSuppliers().subscribe((coms: SupplierModel[]) => {
                     this.Suppliers = coms;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }
    onSubmit(): void {
        debugger;
        if (!this.SupplierForm.value.splId) {
                this.loading = true;
                this.splSrv.addSupplier(this.SupplierForm.value).subscribe(SupplierAdded => {
                      this.SupplierForm.reset();
                      this.SupplierForm.controls['splId'].setValue(null);
                      this.loading = false;
                      this.alrtSrv.success('Created Successfully');
                      this.onGetAllSuppliers();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alrtSrv.danger('Server error');
                  }
                });
        } else if (this.SupplierForm.value.splId) {
                this.splSrv.editSupplier(this.SupplierForm.value.splId, this.SupplierForm.value).subscribe(SupplierAdded => {
                      this.SupplierForm.reset();
                      this.SupplierForm.controls['splId'].setValue(null);
                      this.onGetAllSuppliers();
                      this.alrtSrv.success('Changed Successfully');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alrtSrv.danger('Server error');
                      }
                });
        }
    }
    onEditSupplier(spl) {
        this.SupplierForm.reset();
        this.SupplierForm.patchValue(spl);
        this.SupplierForm.get('splId').patchValue(spl.splId);
    }

    onDeleteSupplier(spl : SupplierModel) {
        if(confirm("Are you sure to delete Supplier " + spl.splName)){
            this.splSrv.deleteSupplier(spl.splId).subscribe((spldlt: SupplierModel) => {
            this.alertService.success('Supplier: ' +  spldlt.splName + ' Deleted Successfully');
            this.onGetAllSuppliers();
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
       this.SupplierForm.reset();
 
    }

    get getSupplierForm() { return this.SupplierForm.controls; }

}
