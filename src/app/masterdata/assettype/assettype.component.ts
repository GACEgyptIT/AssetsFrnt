import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';
import { AssettypeService } from './services/assettype.service';
import { AlertService } from 'ngx-alerts';
import { AsscatserviceService } from '../assetcategory/service/asscatservice.service';
import { AssetCategoryModel } from 'app/shared/models/AssetCategoryModel';

@Component({
  selector: 'app-assettype',
  templateUrl: './assettype.component.html',
  styleUrls: ['./assettype.component.css']
})
export class AssettypeComponent implements OnInit {

  
  CodeExist:Boolean = false;
  public loading = false;
  notificationMessage = '';

  typForm: FormGroup;

  public Types: AssetTypeModel[] = [];
  public Categorys: AssetCategoryModel[] = [];

  onIncrementTypCode(e){
    this.loading = true;
    this.typSrv.incrementTypeCode(e.target.value).subscribe((c:string) =>{
      this.loading = false;
      this.getTypeCode.setValue(c);
     });
  }

  buildTypeForm(){
    this.typForm = this.fb.group({
      AssetTypeId: 0,
      AssetCategoryId: 0,
      astTypeCode: [null, Validators.required],
      astTypeName: [null, Validators.required]
    });

  }
    constructor(
        private typSrv: AssettypeService,
        private catSrv: AsscatserviceService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllTypes();
        this.onGetAllCategorys();
        this.buildTypeForm();
      //  this.onIncrementTypCode(0);
  
    }
    ngOnInit() {

    }
    
    onGetAllTypes() {
      //    debugger;
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

    OnCodeChange(e) {
      this.loading = true;
      this.CodeExist = false;
        this.typSrv.isTypeCodeExist(e.target.value).subscribe((res:Boolean) => {
        //  debugger;
          this.CodeExist = res;
          this.loading = false;
        });

    }

    onGetAllCategorys() {
      //   
            this.loading = true;
            this.catSrv.getAllCategorys().subscribe((coms: AssetCategoryModel[]) => {
            //  debugger;
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
        if (this.typForm.value.AssetTypeId == 0) {
        //  debugger;
          this.loading = true;
                this.typSrv.addAssetType(this.typForm.value).subscribe(TypeAdded => {
                     debugger;
                     this.typForm.controls['astTypeName'].setValue(null);
                      this.loading = false;
                      this.alertService.success('Cearted Successfully ');
                      this.onGetAllTypes();
                      this.onGetAllCategorys(); 
                      debugger;                
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.typForm.value.AssetTypeId > 0) {
                 debugger;
                this.typSrv.editAssetType(this.typForm.value.AssetTypeId, this.typForm.value).subscribe(TypeAdded => {
                  debugger;
                  this.onGetAllTypes();
                      this.onGetAllCategorys();
                   ////   this.typForm.reset();
                      this.typForm.controls['astTypeName'].setValue(null);
                      this.alertService.success('Changed Successfully ');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }

    }
    onEditType(emp) {
    //  debugger;
        this.typForm.reset();
        this.typForm.patchValue(emp);
      //  this.typForm.controls.TypeTypes.get('emptypName').patchValue(emp.TypeType.emptypName);

    }
    onDeleteType(cat : AssetTypeModel) {
        if(confirm("Are you sure to delete Type " + cat.astTypeName)){
          debugger;
          this.typSrv.deleteAssetType(cat.AssetTypeId).subscribe(res => {
      
       
            if(res){
              this.alertService.success('Type: ' +  cat.astTypeName + '  Deleted Successfully');
            }else{
              this.alertService.danger('Failed due to (AssetBrand) relation');
            }
            this.onGetAllTypes();
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


    
    get getTypeForm() { return this.typForm.controls; }

    get getTypeCode() {
      return this.typForm.get('astTypeCode') as FormControl;
    }




}
