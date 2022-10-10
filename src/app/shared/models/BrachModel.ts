import { EmployeeModel } from "./EmployeeModel";
import { AssetModel } from "./AssetModel";


export class BranchsModel {

  brnId?: number;
  brnCode?: string;
  brnName?: string;

  Qnt?: number;
  Price?: number;
  Cost?: number;
  
  Employees?: EmployeeModel[];
  Assets?: AssetModel[];

}
