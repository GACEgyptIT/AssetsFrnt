import { Component, OnInit } from '@angular/core';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ItemcategoryService } from './service/itemcategory.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-itemscategory',
  templateUrl: './itemscategory.component.html',
  styleUrls: ['./itemscategory.component.css']
})
export class ItemscategoryComponent implements OnInit {

  Authorization= new Array();
  Auth:FormGroup;
//  authorization = <FormArray>this.getItemsCategoryForm.Authorization;
 

  public loading = false;
  notificationMessage = '';

  ItemsCategoryForm: FormGroup;

  public ItemsCategorys: ItemsCategoryModel[] = [];

    constructor(
        private icSrv: ItemcategoryService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.ItemsCategoryForm = this.fb.group({
          icId: null,
          icName: [null, Validators.required],
          Authorization:  this.fb.array([]),
          HD: false,
          OM: false,
          HR: false,
          IT: false,
          GM: false
        });
    }
    ngOnInit() {
      this.onGetAllItemsCategorys();
  //  this.Authorization = <FormArray>this.getItemsCategoryForm.Authorization;
    }
    
    onGetAllItemsCategorys() {
            this.loading = true;
            this.icSrv.getAllItemsCategorys().subscribe((brns: ItemsCategoryModel[]) => {  
                    this.ItemsCategorys = brns;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger( 'server error');
                    }
            });
    }
    onSubmit(): void {
        if (!this.ItemsCategoryForm.value.icId) {
          this.loading = true;
                this.icSrv.addItemsCategory(this.ItemsCategoryForm.value).subscribe(ItemsCategoryAdded => {
                      this.ItemsCategoryForm.reset();
                      this.loading = false;
                      this.alertService.success( 'Added successfully ');
                      this.onGetAllItemsCategorys(); 
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger( 'server error ');
                  }
                });
        } else if (this.ItemsCategoryForm.value.icId) {          
                this.icSrv.editItemsCategory(this.ItemsCategoryForm.value.icId, this.ItemsCategoryForm.value).subscribe(ItemsCategoryAdded => {
                      this.ItemsCategoryForm.reset();
                      this.ItemsCategoryForm.controls['icId'].setValue(0);
                      this.onGetAllItemsCategorys();
                      this.alertService.success( 'Changed successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger( 'Server error ');
                      }
                }); 
        }
    }
    onEditItemsCategory(ic) {
      debugger
        this.ItemsCategoryForm.reset();
        this.ItemsCategoryForm.patchValue(ic);
    }
    onDeleteItemsCategory(ic : ItemsCategoryModel) {
        if(confirm("Are you sure to delete ItemsCategory " + ic.icName)){
          this.icSrv.deleteItemsCategory(ic.icId).subscribe((icdlt: ItemsCategoryModel) => {
            this.alertService.success( 'Deleted successfully ');
            this.onGetAllItemsCategorys();
          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger( 'server error ');
            }
          });
        }
    }
    onCancel() {
       this.ItemsCategoryForm.reset();
 
    }
  
    AddAuth(e){
      debugger;
      let authorization = <FormArray>this.getItemsCategoryForm.Authorization;
    //  let a:FormGroup;
  //    a = this.fb.group({AuthName: '', value: false });

      if(e.target.checked == true && e.target.defaultValue == "HD") { 
        this.getHD.patchValue(true);
        this.getOM.patchValue(false);
        authorization.push(this.createAuthGroup(e.target.checked, e.target.defaultValue )); 

        authorization.controls.forEach((c, index)=>{
           if(c.value.value == "OM"){
            debugger;
            authorization.removeAt(index);
           }
        }) ;
        debugger;
      } 
      if(e.target.checked == false && e.target.defaultValue == "HD") {
        this.getHD.patchValue(false);
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "HD"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
       }

      else if(e.target.checked == true && e.target.defaultValue == "OM") { 
        this.getOM.patchValue(true);
        this.getHR.patchValue(false);
        authorization.push(this.createAuthGroup(e.target.checked, e.target.defaultValue )); 
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "HR"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
       debugger;
      } 
      else if(e.target.checked == false && e.target.defaultValue == "OM") { 
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "OM"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
      }
      else if(e.target.checked == true && e.target.defaultValue == "HR") { 
        this.getHR.patchValue(true);
        this.getOM.patchValue(false);
        this.getIT.patchValue(false);
        authorization.push(this.createAuthGroup(e.target.checked, e.target.defaultValue )); 
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "OM" && c.value.value == "IT" ){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
       debugger;
      } 
      else if(e.target.checked == false && e.target.defaultValue == "HR") { 
        this.getHR.patchValue(false);
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "HR"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
      }
      else if(e.target.checked == true && e.target.defaultValue == "IT") { 
        this.getIT.patchValue(true);
        this.getHR.patchValue(false);
        this.getOM.patchValue(false);
        authorization.push(this.createAuthGroup(e.target.checked, e.target.defaultValue )); 
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "HR" && c.value.value == "OM"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
       debugger;
      }
      else if(e.target.checked == false && e.target.defaultValue == "IT"){
        this.getIT.patchValue(false);
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "IT" ){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
      }
      else if(e.target.checked == true && e.target.defaultValue == "GM") { 
        this.getGM.patchValue(true);
        authorization.push(this.createAuthGroup(e.target.checked, e.target.defaultValue )); 
      }
      else if(e.target.checked == false && e.target.defaultValue == "GM") { 
        this.getGM.patchValue(false);
        authorization.controls.forEach((c, index)=>{
          if(c.value.value == "GM"){
           debugger;
           authorization.removeAt(index);
          }
       }) ;
      }
 
      
    }
    createAuthGroup(chk, a): FormGroup{
        this.Auth = this.fb.group({
             AuthName: chk,
             value: a,
           });
        return this.Auth;
    }

    HD(e){
      debugger;
      if(e.target.checked == true){
        this.getHD.patchValue(true);
        this.getOM.patchValue(false);
        // if(this.getHD.value == true) { 
        //   this.Auth.AuthName = "HD";
        //   this.Auth.value = true;
        //   this.Authorization[0] = this.Auth;  
        // } 
        // else
        // {
        //   this.Auth.AuthName = "HD";
        //   this.Auth.value = false;
        //   this.Authorization[0] = this.Auth;  
        // }
      } else{
        this.getHD.patchValue(false);
      }

    }
    OM(e){
      debugger;
      if(e.target.checked == true){
        this.getOM.patchValue(true);
        this.getHR.patchValue(false);
        this.getIT.patchValue(false);
        this.getHD.patchValue(false);
      } else{
        this.getOM.patchValue(false);
      }
    }
    HR(e){
      debugger;
      if(e.target.checked == true){
        this.getHR.patchValue(true);
        this.getOM.patchValue(false);
      } else{
        this.getHR.patchValue(false);
      }
    }
    IT(e){
      debugger;
      if(e.target.checked == true){
        this.getIT.patchValue(true);
        this.getHR.patchValue(false);
        this.getOM.patchValue(false);
      } else{
        this.getIT.patchValue(false);
      }
    }
    GM(e){
      debugger;
      if(e.target.checked == true){
        this.getGM.patchValue(true);
      } else{
        this.getGM.patchValue(false);
      }
    }
    
    get getItemsCategoryForm() { return this.ItemsCategoryForm.controls; }

    get getHD() { return this.ItemsCategoryForm.get('HD') as FormControl;  }
    get getOM() { return this.ItemsCategoryForm.get('OM') as FormControl;  }
    get getHR() { return this.ItemsCategoryForm.get('HR') as FormControl;  }
    get getIT() { return this.ItemsCategoryForm.get('IT') as FormControl;  }
    get getGM() { return this.ItemsCategoryForm.get('GM') as FormControl;  }



}
