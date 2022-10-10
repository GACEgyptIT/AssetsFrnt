import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetBrandModel } from 'app/shared/models/AssetBrandModel';
import { AssetCategoryModel } from 'app/shared/models/AssetCategoryModel';
import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';
import { AlertService } from 'ngx-alerts';
import { AsscatserviceService } from '../assetcategory/service/asscatservice.service';
import { AssettypeService } from '../assettype/services/assettype.service';
import { AssetbrandService } from './service/assetbrand.service';

@Component({
  selector: 'app-assetbrand',
  templateUrl: './assetbrand.component.html',
  styleUrls: ['./assetbrand.component.css']
})
export class AssetbrandComponent implements OnInit {

 

  public loading = false;
  notificationMessage = '';

  typForm: FormGroup;
  CodeExist:Boolean = false;
  public Brands: AssetBrandModel[] = [];
  public Types: AssetTypeModel[] = [];
  public Categorys: AssetCategoryModel[] = [];
  
  onIncrementBrandCode(id){
    debugger;

    // if(id == null){
      id =  this.getSelectedTypeId.value;
    //}
    this.loading = true; 
    this.brndSrv.incrementBrandCode(id).subscribe((c:string) =>{
      this.loading = false; 
      this.getBrandCode.setValue(c);
     });
     this.loading = false; 
  }



    constructor(
        private brndSrv: AssetbrandService,
        private typSrv: AssettypeService,
        private catSrv: AsscatserviceService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllBrands();
        this.onGetAllTypes();
        this.onGetAllCategorys();
   //     this.onIncrementBrandCode(null);
  
    }
    ngOnInit() {
      this.typForm = this.fb.group({
         AssetBrandId: 0,
        // AssetCategoryId: 0,
        AssetTypeId:[0, Validators.required],
        astBrandName: [null, Validators.required],
        astBrandCode: [null, Validators.required],
      });
    }
    OnCodeChange(e) {
      this.loading = true;
      this.CodeExist = false;
        this.brndSrv.isBrandCodeExist(e.target.value).subscribe((res:Boolean) => {
          //debugger;
          this.CodeExist = res;
          this.loading = false;
        });

    }
    onGetAllBrands() {
      //    //debugger;
            this.loading = true;
            this.brndSrv.getAllBrands().subscribe((coms: AssetBrandModel[]) => {
                    this.Brands = coms;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onGetAllTypes() {
      //    //debugger;
            this.loading = true;
            this.typSrv.getAllAssetsTypes().subscribe((coms: AssetTypeModel[]) => {
                    this.Types = coms;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }

    onGetAllCategorys() {
      //   
            this.loading = true;
            this.catSrv.getAllCategorys().subscribe((coms: AssetCategoryModel[]) => {
              //debugger;
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
        //debugger;
        if (this.typForm.value.AssetBrandId == 0) {
        //  //debugger;
          this.loading = true;
                this.brndSrv.addBrandType(this.typForm.value).subscribe(brand => {
                  //debugger;
                  this.loading = false;
                  if(brand != null){
                    this.alertService.success('Cearted Successfully ');
                  }else{
                    this.alertService.danger('Faild ');
                  }
                  //this.typForm.reset();
                     this.typForm.controls['astBrandName'].setValue(null);
                     this.onIncrementBrandCode(this.getSelectedTypeId.value);
              
                 
                      this.onGetAllBrands();
                      this.onGetAllCategorys();                 
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.typForm.value.AssetBrandId > 0) {
                 //debugger;
                this.brndSrv.editBrandType(this.typForm.value.AssetBrandId, this.typForm.value).subscribe(BrandAdded => {
                      this.onGetAllBrands();
                      this.onGetAllCategorys();
                      //this.typForm.reset();
                      this.typForm.controls['astBrandName'].setValue(null);
                      this.alertService.success('Changed Successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }

    }
    onEditBrand(emp) {
    //  //debugger;
        this.typForm.reset();
        this.typForm.patchValue(emp);
      //  this.typForm.controls.BrandBrands.get('emptypName').patchValue(emp.BrandBrand.emptypName);

    }
    onDeleteBrand(bnd : AssetBrandModel) {
        if(confirm("Are you sure to delete Brand " + bnd.astBrandName)){
          //debugger;
          this.brndSrv.deleteBrandType(bnd.AssetBrandId).subscribe(res => {
            debugger;
            if(res){
              this.alertService.success('Type: ' +  bnd.astBrandName + '  Deleted Successfully');
            }else{
              this.alertService.danger('Failed due to (Asset) relation');
            }
            this.onGetAllBrands();
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
       this.typForm.reset();
 
    }
    
    get getBrandForm() { return this.typForm.controls; }

    get getBrandCode() {
      return this.typForm.get('astBrandCode') as FormControl;
   }

   get getSelectedTypeId() {
    return this.typForm.get('AssetTypeId') as FormControl;
 }

}
