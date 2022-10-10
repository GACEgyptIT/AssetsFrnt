import { PrivilegeModel } from "./PrivilegeModel";
import { RoleModel } from "./RoleModel";




export class RolePrivilegesModel {

    
    Id?: number;
    RoleId?: number;
    PrivilegeId?: number;

    Privilege?: PrivilegeModel;
    Role?: RoleModel;

  }