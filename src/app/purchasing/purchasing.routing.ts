import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/authentication/service/auth.guard';
import { ApprovalComponent } from './approval/approval.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ItemComponent } from './item/item.component';

import { PoorderComponent } from './poorder/poorder.component';
import { PrrequestComponent } from './prrequest/prrequest.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { SOHComponent } from './soh/soh.component';
//import { SelectlistboxComponent } from './selectlistbox/selectlistbox.component';
import { StoreComponent } from './store/store.component';
import { TransferComponent } from './transfer/transfer.component';



export const MasterDataRoutes: Routes = [{
  path: '',
  children: [
      {
          path: 'store',
      //    canActivate: [AuthGuard],  
        component: StoreComponent
      },{
         path: 'poorder',
        //  canActivate: [AuthGuard],
         component: PoorderComponent
      },{
          path: 'prrequest',
          component: PrrequestComponent
      },{
          path: 'receiving',
          component: ReceivingComponent
      },{
          path: 'transfer', 
           component: TransferComponent
        },{
            path: 'item', 
             component: ItemComponent
        },{
        path: 'approval',
        component: ApprovalComponent
        },{
        path: 'soh', 
         component: SOHComponent
        },{
          path: 'consumption', 
           component: ConsumptionComponent
        } 
  ]
}
];