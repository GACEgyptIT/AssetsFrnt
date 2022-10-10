import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { ReceivingModel } from 'app/shared/models/ReceivingModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  emp: EmployeeModel;

  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService
    ) {

    this.emp = this.strgSrv.getUserFromStorage();
   }

  getAllReceivings() {
 
    return this.http.get(environment.apiURL + 'Receivings/GetReceivingsList');
  }

  addReceiving(body: ReceivingModel) {
    debugger;
    let empId = 0;
    body.empId = this.emp.empId;
    return this.http.post(environment.apiURL + 'Receivings', body);
  }
  editReceiving(body: ReceivingModel) {
    debugger;
    let id = body.ReceivingId;
    return this.http.put(environment.apiURL + 'Receivings/PutReceiving' + id, body);
  }
  GetReceivingsByEmpId() {
    let empId = 0;
    empId = this.emp.empId;
    return this.http.get(environment.apiURL + 'Receivings/GetReceivingsByEmpId/' + empId);
  }

  deleteSelectedImportedReceivings(body) {
        return this.http.post(environment.apiURL + 'Receivings/DeleteSelected/', body );
  }
  GetAllStatus() {
  //  debugger;
    return this.http.get(environment.apiURL + 'Receivings/ReceivingsStatus');
  }
}
