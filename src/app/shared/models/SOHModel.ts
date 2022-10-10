
import { BranchsModel } from "./BrachModel";
import { CompanyModel } from "./CompanyModel";
import { DepartmentModel } from "./DepartmentModel";
import { EmployeeModel } from "./EmployeeModel";
import { ItemModel } from "./ItemsModel";
import { StoreModel } from "./StoreModel";

export class SOHModel {
    
    ItemName?: string;
    StoreName?: string;
    EmpName?: string;
    DepName?: string;
    BrnName?: string;
    ComName?: string;


    itmId?: number;
    strId?: number;
    empId?: number;
    dptId?: number;
    brnId?: number;
    comId?: number;


    itemVM?: ItemModel;
    storeVM?: StoreModel;
    employeeVM?: EmployeeModel;
    departmentVM?: DepartmentModel;
    branchVM?: BranchsModel;
    companyVM?: CompanyModel;


    ItemVMs?: ItemModel[];
    StoreVMs?: StoreModel[];
    EmployeeVMs?: EmployeeModel[];
    DepartmentVMs?: DepartmentModel[];
    BranchVMs?: BranchsModel[];
    CompanyVMs?: CompanyModel[];

}