import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { PurchasingRequestModel } from 'app/shared/models/PurchaseRequestmodel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrService {
 
  emp: EmployeeModel;

  
  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService
    ) { 
      this.emp = this.strgSrv.getUserFromStorage();
    }
 
  getPRsForUserListByEmpId() {
     debugger;
    
    let empId = 0;
    empId = this.emp.empId;
    return this.http.get(environment.apiURL + 'PRs/GetPRsForUserListByEmpId/' + empId );
  }

  addPR(body: PurchasingRequestModel) {
    debugger;

    let empId = 0;
    body.empId = this.emp.empId;
    return this.http.post(environment.apiURL + 'PurchaseRequests', body);
  }
  editPR(body: PurchasingRequestModel) {
    
    let id = body.PurchaseRequestId;
    return this.http.put(environment.apiURL + 'PurchaseRequests/PutPurchaseRequest' + id, body);
  }
  GetPRById(id) {
    return this.http.get(environment.apiURL + 'PRs/GetPRById/' + id);
  }

  deleteSelectedImportedPRs(body) {
        return this.http.post(environment.apiURL + 'PRs/DeleteSelected/', body );
  }
  GetAllStatus() {
  //  
    return this.http.get(environment.apiURL + 'PRs/PurchaseRequestsStatus');
  }

  onApprovePr(id: number){
    return this.http.get(environment.apiURL + 'PRs/ApprovePr/' + id);
  }


}
