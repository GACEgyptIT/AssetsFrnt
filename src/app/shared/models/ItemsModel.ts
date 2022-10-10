//import { CategoryModel } from './AssetCategoryModel';
import { ReceivingModel } from './ReceivingModel';
import { StoreModel } from './StoreModel';
import { TransferModel } from './TransferModel';

export class ItemModel {

  itmId?: number;
  itmName?: string;
  ConsumtionName?: string;
  itmPrice?: number;
  ItmCost?: number;
  itmTotalPricePO?: number;
  ItmQntPR?: number;
  ItmQntPO?: number;
  ItmQntRec?: number;
  ItmQntRecCons?: number;
  ItmQntStore?: number;
  date?: Date;
  icId?: number;
  icName?: string;
  PRsIds?: number[];
  POsIds?: number[];
  Stores?: StoreModel[];
  Receivings?: ReceivingModel[];
  Transfers?: TransferModel[];
}


