import { SupplierModel } from "./SupplierModel";
import { CostCenterModel } from "./CostCenterModel";
import { ItemsCategoryModel } from "./ItemsCategoryModel";
import { DateObject, DateArray } from "ngx-bootstrap/chronos/types";
import { DateFormatter } from "ngx-bootstrap";
import { Time, CurrencyPipe } from "@angular/common";


export class InvoicesModel {

  InvoiceId?: number;
  invNumber?: string;
  invAmount?: number;
  invDate?: Date;
  InvFile?: string;
  InvFileAttached?: boolean;
  invStatus?: string;
  Remarks?: string;
  empId?: number;
  icId?: number;
  splId?: number;
  CostCenterId?: number;

  ItemsCategoryName?: string;
  CostCenterName?: string;
  SupplierName?: string;
  EmployeeName?: string;
  EmployeeHRcode?: string;

  ItemsCategory?: ItemsCategoryModel;
  Supplier?: SupplierModel;
  CostCenter?: CostCenterModel;
  checkbox?: boolean;
  DailNumbers?: [];
}
