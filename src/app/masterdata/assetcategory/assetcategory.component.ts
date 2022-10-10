import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetCategoryModel } from 'app/shared/models/AssetCategoryModel';
//import { AssetCategoryModel } from 'app/shared/models/AssetCategoryModel';
import { AlertService } from 'ngx-alerts';
import { AsscatserviceService } from './service/asscatservice.service';

@Component({
  selector: 'app-assetcategory',
  templateUrl: './assetcategory.component.html',
  styleUrls: ['./assetcategory.component.css']
})
export class AssetcategoryComponent implements OnInit {


  public loading = false;
  CodeExist:Boolean = false;
  notificationMessage = '';

  categoryForm: FormGroup;

  public Categorys: AssetCategoryModel[] = [];

    constructor(
        private catSrv: AsscatserviceService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllCategorys();
  
    }
    ngOnInit() {
      this.categoryForm = this.fb.group({
        AssetCategoryId: 0,
        astCategoryCode: [null, [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        astCategoryName: [null, Validators.required]
      });
    }
    
    onGetAllCategorys() {
      //    debugger;
            this.loading = true;
            this.catSrv.getAllCategorys().subscribe((coms: AssetCategoryModel[]) => {
                    this.Categorys = coms;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    status = '';
    setStatus(s){
      this.status = s;
    }
    onSubmit(): void {
        debugger;
        if (this.categoryForm.value.AssetCategoryId == 0) {
        //  debugger;
          this.loading = true;
                this.catSrv.addCategory(this.categoryForm.value).subscribe(CategoryAdded => {
                      this.categoryForm.reset();
                      this.categoryForm.controls['AssetCategoryId'].setValue(0);
                      this.loading = false;
                      this.alertService.success('Cearted Successfully ');
                      this.onGetAllCategorys();                 
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.categoryForm.value.AssetCategoryId > 0) {
                 debugger;
                this.catSrv.editCategory(this.categoryForm.value.AssetCategoryId, this.categoryForm.value).subscribe(CategoryAdded => {
                      this.onGetAllCategorys();
                      this.categoryForm.reset();
                      this.categoryForm.controls['AssetCategoryId'].setValue(0);
                      this.alertService.success('Changed Successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditCategory(emp) {
    //  debugger;
        this.categoryForm.reset();
        this.categoryForm.patchValue(emp);
      //  this.categoryForm.controls.CategoryTypes.get('emptypName').patchValue(emp.CategoryType.emptypName);

    }
    onDeleteCategory(cat : AssetCategoryModel) {
        if(confirm("Are you sure to delete Category " + cat.astCategoryName)){
       
          this.catSrv.deleteCategory(cat.AssetCategoryId).subscribe(res => {
            debugger;
            if(res){
              this.alertService.success('Category: ' +  cat.astCategoryName + '  Deleted Successfully');
            }else{
              this.alertService.danger('Failed due to (AssetTypes) relation');
            }

          // this.alertService.info('this is an info alert');
          // this.alertService.danger('this is a danger alert');
          // this.alertService.success('this is a success alert');
          // this.alertService.warning('this is a warning alert');
          // this.alertService.warning({html: '<a (click)="okAlertFn()"><b>Yes Proceed</b></a> '});
            this.onGetAllCategorys();

          }, error => {

            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('server error ');
            }
          });
        }
    }
    onCancel() {
       this.categoryForm.reset();
 
    }

    OnCodeChange(e) {
      this.loading = true;
      this.CodeExist = false;
        this.catSrv.isCategoryCodeExist(e.target.value).subscribe((res:Boolean) => {
          debugger;
          this.CodeExist = res;
          this.loading = false;
        });

    }

    onIncrementCategoryCode(){
       debugger;
       this.loading = true;
       // var index = e.target.options.selectedIndex;
       // var selected = e.target.options[index].label;
       this.catSrv.incrementCategoryCode().subscribe((c:string) =>{
         debugger;
         this.loading = false;
         this.getCategoryCode.setValue(c);
        });
     }
    
    get getCategoryForm() { return this.categoryForm.controls; }

    get getCategoryCode() {
      return this.categoryForm.get('astCategoryCode') as FormControl;
    }


}
