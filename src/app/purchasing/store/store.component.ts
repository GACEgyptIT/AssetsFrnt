import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StoreModel } from 'app/shared/models/StoreModel';
import { StoreService } from './service/store.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public loading = false;
  notificationMessage = '';

  storeForm: FormGroup;

  public Stores: StoreModel[] = [];

    constructor(
        private brnSrv: StoreService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllStores();
  
    }
    ngOnInit() {
      this.storeForm = this.fb.group({
        StoreId: 0,
        strName: [null, Validators.required]
      });
    }
    
    onGetAllStores() {
      //    
            this.loading = true;
            this.brnSrv.getAllStores().subscribe((brns: StoreModel[]) => {
                    this.Stores = brns;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(status): void {
        
        if (this.storeForm.value.StoreId == 0) {
        //  
          this.loading = true;
                this.brnSrv.addStore(this.storeForm.value).subscribe(StoreAdded => {
                      this.storeForm.reset();
                      this.storeForm.controls['StoreId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Created Successfully ');
                      this.onGetAllStores();       
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.storeForm.value.StoreId > 0) {
                 
                this.brnSrv.editStore(this.storeForm.value.StoreId, this.storeForm.value).subscribe(StoreAdded => {
                      this.storeForm.reset();
                      this.storeForm.controls['StoreId'].setValue(0);
                      this.onGetAllStores();
                      this.alertService.success('Chnaged Successfully ');
                }, error => {
   
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditStore(str) {
    //  
        this.storeForm.reset();
        this.storeForm.patchValue(str);
      //  this.storeForm.controls.StoreTypes.get('emptypName').patchValue(str.StoreType.emptypName);

    }
    onDeleteStore(str : StoreModel) {
        if(confirm("Are you sure to delete Store " + str.strName)){
          
          this.brnSrv.deleteStore(str.StoreId).subscribe((empdlt: StoreModel) => {

            this.alertService.success('Deleted Successfully');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
          // this.alertService.success('this is a success alert');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllStores();

          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.storeForm.reset();
 
    }
    
    get getStoreForm() { return this.storeForm.controls; }


}

