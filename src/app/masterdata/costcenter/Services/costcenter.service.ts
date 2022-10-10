import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CostCenterModel } from 'app/shared/models/CostCenterModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CostcenterService {
  emp: EmployeeModel;
  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService
    
    ) { 
      this.emp = this.strgSrv.getUserFromStorage();
    }

  // getAllCostCenters() {

  //   return this.http.get(environment.apiURL + 'CostCenters');
  // }

  getCostCentersByEmpId() {
  //  debugger;
   
   let empId = 0;
   empId = this.emp.empId;
   return this.http.get(environment.apiURL + 'CostCenters/getCostCentersByEmpId/' + empId );
 }

  addCostCenter(body: CostCenterModel) {
    
    return this.http.post(environment.apiURL + 'CostCenters', body);
  }

  editCostCenter(id: number, body: CostCenterModel) {
    return this.http.put(environment.apiURL + 'CostCenters/' + id, body);
  }

  // deleteCostCenter(id: number){
  //   return this.CostCenter.delete(environment.apiURL + `CostCenters/$(id)`);
  // }
  deleteCostCenter(id) {
    return this.http.delete(environment.apiURL + 'CostCenters/' + id);
  }
}
