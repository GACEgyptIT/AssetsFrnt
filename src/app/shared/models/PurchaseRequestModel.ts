import { ItemModel } from "./ItemsModel";

export class PurchasingRequestModel {

    PurchaseRequestId?: number;
    stsName?: string;
    stsRefernce?: string;
    prRemarks?: string;
    RequesterRemarkItems: string;
    prDate?: string;
  //  prDate?: Date;
    Items?: ItemModel[];

    checkbox?: boolean;
    empId?: number;
    accountName?: string;

    HD?: boolean;
    HDApproved?: boolean;
    OM?: boolean;
    OMApproved?: boolean;
    HR?: boolean;
    HRApproved?: boolean;
    IT?: boolean;
    ITApproved?: boolean;
    GM?: boolean;
    GMApproved?: boolean;

}