import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AssetComponent } from './asset/asset.component';
import { AssetuploadComponent } from './asset/assetupload/assetupload.component';
import { MasterDataRoutes } from "./masterdata.routing";
import { RouterModule } from '@angular/router';
import { AssettypeComponent } from './assettype/assettype.component';
import { BranchComponent } from './branch/branch.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { GenaricemailComponent } from './genaricemail/genaricemail.component';
import { PositionComponent } from './position/position.component';
import { EmployeeimportComponent } from './employee/employeeimport/employeeimport.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-alerts';
import { CodeguideComponent } from './codeguide/codeguide.component';
import { DomainComponent } from './domain/domain.component';
// import { ImageCropperComponent } from 'ngx-img-cropper';
import { SupplierComponent } from './supplier/supplier.component';
import { CostCenterComponent } from './costcenter/costcenter.component';
import { ItemscategoryComponent } from './itemscategory/itemscategory.component';
import { AssettrackinglogComponent } from './asset/assettrackinglog/assettrackinglog.component';
import { ShowadaccountsComponent } from './employee/showadaccounts/showadaccounts.component';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { OperatorComponent } from './operator/operator.component';
import { EmpdirectoryComponent } from './employee/empdirectory/empdirectory.component';
import { UploademployeeComponent } from './employee/uploademployee/uploademployee.component';
import { OpraccnumberComponent } from './opraccnumber/opraccnumber.component';
import { OperatorrateplanComponent } from './operatorrateplan/operatorrateplan.component';
import { AssetcategoryComponent } from './assetcategory/assetcategory.component';
import { AssetbrandComponent } from './assetbrand/assetbrand.component';

@NgModule({
  declarations: [
    // SweetAlertComponent,
    // ImageCropperComponent, 
    AssetComponent, 
    AssetuploadComponent, 
    AssettypeComponent, 
    BranchComponent, 
    EmployeeComponent, 
    CompanyComponent, 
    DepartmentComponent, 
    GenaricemailComponent, 
    PositionComponent, 
    EmployeeimportComponent, 
    CodeguideComponent, 
    DomainComponent, SupplierComponent, CostCenterComponent, 
    ItemscategoryComponent, AssettrackinglogComponent, ShowadaccountsComponent, 
    OperatorComponent, EmpdirectoryComponent, UploademployeeComponent, OpraccnumberComponent, 
    OperatorrateplanComponent, 
    AssetcategoryComponent, 
    AssetbrandComponent
  ],
  imports: [
 
    NgxPrintModule,
    NgxAutocompleteModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    CommonModule,
    RouterModule.forChild(MasterDataRoutes),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    ModalModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ]
  
  // providers: [
  //   { 
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: forwardRef(() => EmployeeComponent),
  //   }
  // ]
})
export class MasterdataModule { }
