import { RolePrivilegesModel } from "./RolePrivilege";
import { UsersModule } from "app/users/users.module";


export class RoleModel {

    roleId?: number;
    roleName?: string;

    Privileges?: [];
    RolePrivileges?: RolePrivilegesModel[];
    Users?: UsersModule[];
  }