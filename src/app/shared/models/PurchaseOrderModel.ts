
import { ItemModel } from "./ItemsModel";
import { PurchasingRequestModel } from "./PurchaseRequestmodel";

export class PurchasingOrderModel {

    PurchaseOrderId?: number;
    stsName?: string;
    poRemarks?: string;
    poDate?: Date;
    splId?: number;
    splName?: string;
    empId?: number;
    accountName?: string;
    PurchaseRequestes?: PurchasingRequestModel[];
    Items?: ItemModel[];
    poTotalAmount?: number;

    checkbox?: boolean;

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