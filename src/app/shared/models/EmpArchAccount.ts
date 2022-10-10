import { EmployeeModel } from "./EmployeeModel";
import { ADArchiveAccModel } from "./ADArchiveAccModel";



export class EmpArchAccountModel {

    EmpArchAccountId?: number;
    empId?: number;
    ADArchiveAccountId?: number;

    Employee?: EmployeeModel;
    ADArchiveAccount?: ADArchiveAccModel;
  
  }