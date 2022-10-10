import { Routes } from '@angular/router';
import { AssetComponent } from './asset/asset.component';
import { AssetuploadComponent } from './asset/assetupload/assetupload.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeimportComponent } from './employee/employeeimport/employeeimport.component';
import { AuthGuard } from '../shared/authentication/service/auth.guard';
import { AssettypeComponent } from './assettype/assettype.component';
import { BranchComponent } from './branch/branch.component';
import { GenaricemailComponent } from './genaricemail/genaricemail.component';
import { PositionComponent } from './position/position.component';
import { EmployeeADImportedModel } from 'app/shared/models/EmployeeADImportedModel';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { DomainComponent } from './domain/domain.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CostCenterComponent } from './costcenter/costcenter.component';
import { ItemscategoryComponent } from './itemscategory/itemscategory.component';
import { UseractionlogComponent } from '../users/useractionlog/useractionlog.component';
import { AssettrackinglogComponent } from './asset/assettrackinglog/assettrackinglog.component';
import { ShowadaccountsComponent } from './employee/showadaccounts/showadaccounts.component';
import { OperatorComponent } from './operator/operator.component';
import { EmpdirectoryComponent } from './employee/empdirectory/empdirectory.component';
import { UploademployeeComponent } from './employee/uploademployee/uploademployee.component';
import { OperatorrateplanComponent } from './operatorrateplan/operatorrateplan.component';
import { OpraccnumberComponent } from './opraccnumber/opraccnumber.component';
import { AssetcategoryComponent } from './assetcategory/assetcategory.component';
import { AssetbrandComponent } from './assetbrand/assetbrand.component';

export const MasterDataRoutes: Routes = [{
  path: '',
  children: [
      {
          path: 'assets',
  //        canActivate: [AuthGuard],  
          component: AssetComponent
      } 
      ,{
        path: 'assetbrand',
   //        canActivate: [AuthGuard],  
           component: AssetbrandComponent
         }
         ,{
          path: 'assettype',
    //         canActivate: [AuthGuard],  
             component: AssettypeComponent
           }
      ,{
        path: 'assetcategory',
   //      canActivate: [AuthGuard],  
           component: AssetcategoryComponent
         }


      ,{
         path: 'assettrackinglog',
          canActivate: [AuthGuard],
         component: AssettrackinglogComponent
      },{
        path: 'assetsupload',
   //      canActivate: [AuthGuard],
         component: AssetuploadComponent
        },{
        path: 'showadaccounts', 
        component: ShowadaccountsComponent
      },{
        path: 'employee',
        canActivate: [AuthGuard],  
        component: EmployeeComponent
      },{
        path: 'uploademployee',
        component: UploademployeeComponent
      },{
        path: 'empdirectory',
        component: EmpdirectoryComponent
      },{
        path: 'employeeimport',
        canActivate: [AuthGuard],  
        component: EmployeeimportComponent
      },{
        path: 'branch',
        canActivate: [AuthGuard],  
        component: BranchComponent
      },{
        path: 'company',
   canActivate: [AuthGuard],  
        component: CompanyComponent
      },{ 
        path: 'opraccnumber',
       canActivate: [AuthGuard],  
        component: OpraccnumberComponent
      },{
        path: 'operatorrateplan',
         canActivate: [AuthGuard],  
        component: OperatorrateplanComponent
      },{
        path: 'operator',
   //     canActivate: [AuthGuard],  
        component: OperatorComponent
      },{
        path: 'genaricemail',
  //      canActivate: [AuthGuard],  
        component: GenaricemailComponent
      },{
        path: 'domain',
        canActivate: [AuthGuard],  
        component: DomainComponent
      },{
        path: 'position',
        canActivate: [AuthGuard],  
        component: PositionComponent
      },{
        path: 'department',
        canActivate: [AuthGuard],  
        component: DepartmentComponent
      },{
        path: 'supplier',
        canActivate: [AuthGuard],  
        component: SupplierComponent
      },{
        path: 'CostCenter',
        canActivate: [AuthGuard],  
        component: CostCenterComponent
      },{
        path: 'itemscategory',
        canActivate: [AuthGuard],  
        component: ItemscategoryComponent
      }

  ]
}
];