import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { PurchasingOrderModel } from 'app/shared/models/PurchaseOrdermodel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoService {
  emp: EmployeeModel;

  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService
    ) { 
    this.emp = this.strgSrv.getUserFromStorage();
  }

  // getReadyPRsByEmpId() {
  //   debugger;
   
  //  let empId = 0;
  //  empId = this.emp.empId;
  //  return this.http.get(environment.apiURL + 'PRs/getReadyPRsByEmpId/' + empId );
  // }

  GetPRsForPOsByEmpId() {
    let empId = 0;
    empId = this.emp.empId;
    return this.http.get(environment.apiURL + 'GetPRsForPOsByEmpId/' + empId);
  }
  getPOsListByEmpId() {
    debugger;
   
   let empId = 0;
   empId = this.emp.empId;
   return this.http.get(environment.apiURL + 'POs/getPOsListByEmpId/' + empId );
  }
  // getPOsListByEmpId(body: PurchasingOrderModel) {
  //  debugger;
  //   body.empId = this.emp.empId;
  //   return this.http.post(environment.apiURL + 'POs/PurchaseOrdersOpen');
  // }

  addPO(body: PurchasingOrderModel) {
    debugger;
    body.empId = this.emp.empId;
    return this.http.post(environment.apiURL + 'PurchaseOrders', body);
  }
  editPO(body: PurchasingOrderModel) {
    debugger;
    let id = body.PurchaseOrderId;
    return this.http.put(environment.apiURL + 'PurchaseOrders/PutPurchaseOrder' + id, body);
  }
  GetPOById(id) {
    return this.http.get(environment.apiURL + 'POs/GetPOById/' + id);
  }

  deleteSelectedImportedPOs(body) {
        return this.http.post(environment.apiURL + 'POs/DeleteSelected/', body );
  }
  GetAllStatus() {
  //  debugger;
    return this.http.get(environment.apiURL + 'POs/PurchaseOrdersStatus');
  }

}
