import { RolePrivilegesModel } from "./RolePrivilege";


export class PrivilegeModel {

    PrivilegeId?: number;
    PrivilegeName?: string;
    Page?: string;
    RolePrivileges?: RolePrivilegesModel[];

  }