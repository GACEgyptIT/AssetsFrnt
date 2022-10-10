import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutes } from './operation-routing';
import { AssetmngComponent } from './assetmng/assetmng.component';
import { InvoicemngComponent } from './invoicemng/invoicemng.component';
import { RequestmngComponent } from './requestmng/requestmng.component';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-alerts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmailmngComponent } from './emailmng/emailmng.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { DynamicemailsComponent } from './dynamicemails/dynamicemails.component';


import { MulipleselectboxComponent } from './mulipleselectbox/mulipleselectbox.component';

import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
//import { SearchpageComponent } from './searchpage/searchpage.component';
import { InvoicelinesComponent } from './invoicelines/invoicelines.component';
import { ReportsComponent } from './invoicemng/reports/reports.component';
import { LbdChartMonthComponent } from './invoicemng/reports/lbd-chartMonths/lbd-chartMonth.component';
import { LbdChartBranchComponent } from './invoicemng/reports/lbd-chartBranchs/lbd-chartBranch.component';
import { UploadimgComponent } from './uploadimg/uploadimg.component';
//import { InvoicedashboardComponent } from './invoicedashboard/invoicedashboard.component';
// import { DatafilterPipe } from 'app/shared/pipes/datafilter.pipe';


@NgModule({
  declarations: [ 
    LbdChartMonthComponent,
    LbdChartBranchComponent,
    AssetmngComponent, 
    InvoicemngComponent, 
    RequestmngComponent, 
    EmailmngComponent, 
    DynamicformComponent, 
    DynamicemailsComponent, 
    MulipleselectboxComponent, 
    InvoicelinesComponent, 
    ReportsComponent,
    UploadimgComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    NgxPrintModule,
    NgxAutocompleteModule,
    NgxPaginationModule,
    OrderModule,
    CommonModule,
    RouterModule.forChild(OperationRoutes),
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
})
export class OperationModule { }
