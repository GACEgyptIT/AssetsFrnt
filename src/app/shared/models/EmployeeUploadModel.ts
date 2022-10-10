import { EmpArchivesModel } from "./EmpArchivesModel";
import { EmpGmailModel } from "./EmpGmailModel";
import { ADArchiveAccModel } from "./ADArchiveAccModel";

export class EmployeesUploadModel {

    empId?: number;
    empHRCode?: string;
    empFullName?: string;
    Position?: string;
    DirectMngName?: string;
    DepartmentName?: string;
    BranchName?: string;
    CompanyName?: string;
    empMobiles?: []
    emailsINDIV?: emailsINDIVModel[];
    emailsGEN?: emailsGENModel[];
    emailsARCH?: ADArchiveAccModel[];

    EmpGmails?: EmpGmailModel[];
    EmpArchives?: EmpArchivesModel;

    checkbox?: boolean;
}

export class emailsINDIVModel {
    emailAddress: string;
}
export class emailsGENModel {
    genEmailId: number;
    genEmailAddress: string;
}