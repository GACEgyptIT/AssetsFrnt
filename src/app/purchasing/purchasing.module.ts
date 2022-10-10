import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MasterDataRoutes } from "./purchasing.routing";
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-alerts';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { TransferComponent } from './transfer/transfer.component';
import { PrrequestComponent } from './prrequest/prrequest.component';
import { PoorderComponent } from './poorder/poorder.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { StoreComponent } from './store/store.component';
import { ItemComponent } from './item/item.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SOHComponent } from './soh/soh.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ApprovalComponent } from './approval/approval.component';

@NgModule({
  declarations: [
   StoreComponent,
   PoorderComponent,
   PrrequestComponent,
   ReceivingComponent,
   TransferComponent,
   ItemComponent,
   SOHComponent,
   ConsumptionComponent,
   ApprovalComponent
 
],
  imports: [
    NgMultiSelectDropDownModule,
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
export class PurchasingModule { }
