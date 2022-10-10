import { EmployeeModel } from "./EmployeeModel";
import { GenaricEmailModel } from "./GenaricEmailModel";



export class EmpGmailModel {

    EmpGmailId?: number;
    empId?: number;
    genEmailId?: number;

    Employee?: EmployeeModel;
    GenaricEmail?: GenaricEmailModel;
  
  }