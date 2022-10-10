import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetmngComponent } from './assetmng/assetmng.component';
import { InvoicemngComponent } from './invoicemng/invoicemng.component';
import { RequestmngComponent } from './requestmng/requestmng.component';
import { EmailmngComponent } from './emailmng/emailmng.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { DynamicemailsComponent } from './dynamicemails/dynamicemails.component';
import { AuthGuard } from 'app/shared/authentication/service/auth.guard';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';
import { MulipleselectboxComponent } from './mulipleselectbox/mulipleselectbox.component';
import { InvoicelinesComponent } from './invoicelines/invoicelines.component';
import { ReportsComponent } from './invoicemng/reports/reports.component';

const routes: Routes = [];

export const OperationRoutes: Routes = [{
  path: '',
  children: [
      {
        path: 'assetmng',
    //    canActivate: [AuthGuard],
        component: AssetmngComponent
      },{
        path: 'reports',
      //  canActivate: [AuthGuard],
        component: ReportsComponent
      // },{
      //   path: 'Invoicedashboard',
      //   component: InvoicedashboardComponent
      },{
        path: 'invoicelines',
      //  canActivate: [AuthGuard],
        component: InvoicelinesComponent
      },{
        path: 'invoicemng',
     //   canActivate: [AuthGuard],
        component: InvoicemngComponent
      },{
        path: 'requestmng',
    //    canActivate: [AuthGuard],
        component: RequestmngComponent
      },{
        path: 'emailmng',
    //    canActivate: [AuthGuard],  
        component: EmailmngComponent
      },{
        path: 'dynamicform',
    //    canActivate: [AuthGuard],  
        component: DynamicformComponent
      },{
        path: 'dynamicemails',
   //     canActivate: [AuthGuard],  
        component: DynamicemailsComponent
      },{
        path: 'mulipleselectbox',
   //     canActivate: [AuthGuard],  
        component: MulipleselectboxComponent
      }
 
  ]
}];
