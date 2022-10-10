import { ItemModel } from "./ItemsModel";
import { PurchasingOrderModel } from "./PurchaseOrderModel";


export class ReceivingModel {

    ReceivingId?: number;
    poRemarks?: string;
    splName?: string;
    strName?: string;
    EmpName?: string;
    DptName?: string;
    BrnName?: string;
    ComName?: string;
    recDate?: Date;
    PurchaseOrderId?: number;
    StoreId?: number;
    RecTotalCost?: number;
    Items?: ItemModel[];
    PO?: PurchasingOrderModel;
    EmployeeRecID?: number;
    empId?:  number;
}
