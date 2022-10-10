import { StoreModel } from "./StoreModel";

export class TransferModel {

    TransferId?: number;
    itmId?: number;
    trnsDate?: Date;
    itmName?: string;
    itmQnt?: number;
    Price?: number;
    Cost?: number;
    FromStoreName?: string;
    ToStoreName?: string;
    EmpName?: string;
    DptName?: string;
    BrnName?: string;
    ComName?: string;
    UserName?: string;

    Item?: number;
    FromStore?: StoreModel;
    ToStore?: StoreModel;
  
  }