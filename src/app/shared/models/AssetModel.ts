import { AssetTypeModel } from "./AssetTypeModel";
import { EmployeeModel } from "./EmployeeModel";
import { BranchsModel } from "./BrachModel";
import { CompanyModel } from "./CompanyModel";
import { AssetTrackingModel } from "./AssetTrackingModel";

export class AssetModel {

  astId?: number;
  AssetCategoryName?: string;
  AssetTypeName?: string;
  AssetBrandName?: string;
  astBrandCode?: string;
  astDescription?: string;
  astCode?: string;
  astSerialNumber?: string;
  astPartNumber?: string;
  astDialNumber?: string;
  astCircuitNumber?: string;
  astPurchaseDate?: Date;
  Charging?: string;
  AccNumber?: string;
  astCodeDescEmp?: string;
  IsScrap?: boolean;
  asttypId?: number;
  empId?: number;
  //empHRCode?: number;
  oprId?: number;
  OperatorRatePlanId?: number;
  OprAccNumberId?: number;

  checkbox?: boolean;

  EmployeeName?: string;
  DepartmentName?: string;
  empHRCode?: string;
  BranchName?: string;
  CompanyName?: string;
  OprAccNumberName?: string;
  AssetRatePlanName?: string;
  amount?: number;

  AssetType?: AssetTypeModel;
  assetsNew?: [];
  assetsCurrent?: [];
  AssetTrackingVMs?: any;
  
}
