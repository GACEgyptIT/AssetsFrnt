import { DepartmentModel } from './DepartmentModel';
import { BranchsModel } from './BrachModel';
import { AssetModel } from './AssetModel';
import { PositionModel } from './PositionModel';
import { EmpGmailModel } from './EmpGmailModel';
import { CompanyModel } from './CompanyModel';
import { ADArchiveAccModel } from './ADArchiveAccModel';
import { RoleModel } from './RoleModel';


export class EmployeeModel {

  empId?: number; 
  isUsertoLogin?: boolean;
  empHRCode?: string;
  
  empFirstName?: string;
  empSecondName?: string;
  empLastName?: string;
  empFullName?: string;
  accountName?: string;
  empGender?: string;
  empAddress?: string;
  empCreationDate?: Date;
  empBirhtday?: Date;

  empExt?: string;
  empPri?: string;
  empMobile0?: string;
  empMobile1?: string;
  empMobile2?: string;
  empIndividualEmail0?: string;
  empIndividualEmail1?: string;
  empIndividualEmail2?: string;
  empIndividualEmail3?: string;

  empGenaricEmail0?: string;
  empGenaricEmail1?: string;
  empGenaricEmail2?: string;
  empGenaricEmail3?: string;
  empGenaricEmail4?: string;
  empGenaricEmail5?: string;

  empArchiveEmail0?: string;
  empArchiveEmail1?: string;
  empArchiveEmail2?: string;
  empArchiveEmail3?: string;
  empArchiveEmail4?: string;
  empArchiveEmail5?: string;


  Qnt?: number;
  Price?: number;
  Cost?: number;

  comId?: number;
  dptId?: number;
  brnId?: number;
  posId?: number;
  directMngId?: number;

  EmpImg?: string;
  DepartmentName?: string;
  BranchName?: string;
  CompanyName?: string;
  directMngHRcode?: string;
  directMngName?: string;
  EmpData?: string;
  EmpCode?: string;
  Position?: string;

  emailsINDIV?: emailsINDIVModel[];
  emailsGEN?: emailsGENModel[];
  emailsARCH?: ADArchiveAccModel[];

  PositionTitle?: PositionModel;
  Assets?: AssetModel[];
  EmpGmails?: EmpGmailModel[];
  EmpArchives?: ADArchiveAccModel[];

  assetsCurrent?: AssetModel[];
  assetsNew?: AssetModel[];

  checkbox?: boolean;
  mailCheckBox?: boolean;
  EmployeeActive?: boolean;
  IsExist?: boolean;
  duplicatHrCode?: boolean;

  usrPassword?: string;

  ADLogin?: number;

  HD?: boolean;
  IT?: boolean;
  HR?: boolean;
  OM?: boolean;
  GM?: boolean;

  IP_Address?: string;
  Action?: string;
  ActionTime?: string;

  ///////////////////////////////
  Privileges?: [];
  Roles?: RoleModel[];
  roleId?: number;
  Role?: RoleModel;
  userRole?: string;  // to be removed
  rolesNames?: string[];

}

export class emailsINDIVModel {
  emailAddress: string;
}
export class emailsGENModel {
  genEmailId: number;
  genEmailAddress: string;
}

export class tokenModel {
  token: string;
  refreshToken: string;
}


