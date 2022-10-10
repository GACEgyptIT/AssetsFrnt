import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApproveRejectModel } from 'app/shared/models/ApprovalModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  emp: EmployeeModel;
  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService
  ) {
    this.emp = this.strgSrv.getUserFromStorage();
   }

   getPRsForApprovalByEmpId() {
     debugger;
      let empId = 0;
      empId = this.emp.empId;
      return this.http.get(environment.apiURL + 'PRs/getPRsForApprovalByEmpId/' + empId );
    }

    onApproveReject(action: ApproveRejectModel){
      debugger;
      action.ActionByEmpId = this.emp.empId;
      return this.http.post(environment.apiURL + 'PRs/ApproveReject', action);
    }
}
