import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { ItemService } from './service/item.service';
import { AlertService } from 'ngx-alerts';
import { ItemcategoryService } from 'app/masterdata/itemscategory/service/itemcategory.service';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public loading = false;
  notificationMessage = '';
  public ItemsCategorys: ItemsCategoryModel[] = [];
  itemForm: FormGroup;

  public Items: ItemModel[] = [];

    constructor(
        private itmSrv : ItemService,
        private icSrv: ItemcategoryService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllItems();
        this.onGetAllItemsCategorys();
  
    }
    ngOnInit() {
      this.itemForm = this.fb.group({
        itmId: 0,
        itmName: [null, Validators.required],
        itmPrice: [0, Validators.required],
        icId: null
      });
    }
    
    onGetAllItems() {
      //    
            this.loading = true;
            this.itmSrv.getAllItems().subscribe((brns: ItemModel[]) => {
                    this.Items = brns;
                    this.loading = false;
              }, error => {

                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onGetAllItemsCategorys() {
      //  
       this.icSrv.getAllItemsCategorys().subscribe((ics: ItemsCategoryModel[]) => {
      //    
          this.ItemsCategorys = ics;
       });
    }
    onSubmit(status): void {
        
        if (this.itemForm.value.itmId == 0) {
        //  
          this.loading = true;
                this.itmSrv.addItem(this.itemForm.value).subscribe(ItemAdded => {
                      this.itemForm.reset();
                      this.itemForm.controls['itmId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Created Successfully ');
                      this.onGetAllItems();       
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.itemForm.value.itmId > 0) {
                 
                this.itmSrv.editItem(this.itemForm.value.itmId, this.itemForm.value).subscribe(ItemAdded => {
                      this.itemForm.reset();
                      this.itemForm.controls['itmId'].setValue(0);
                      this.onGetAllItems();
                      this.alertService.success('Chnaged Successfully ');
                }, error => {
   
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditItem(itm) {
    //  
        this.itemForm.reset();
        this.itemForm.patchValue(itm);
      //  this.itemForm.controls.ItemTypes.get('emptypName').patchValue(itm.ItemType.emptypName);

    }
    onDeleteItem(itm : ItemModel) {
        if(confirm("Are you sure to delete Item " + itm.itmName)){
          
          this.itmSrv.deleteItem(itm.itmId).subscribe((empdlt: ItemModel) => {

            this.alertService.success('Deleted Successfully');
          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
          // this.alertService.success('this is a success alert');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllItems();

          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.itemForm.reset();
 
    }
    
    get getItemForm() { return this.itemForm.controls; }


}


