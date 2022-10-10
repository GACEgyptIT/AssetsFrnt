import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  emp: EmployeeModel;
  constructor(
    private http: HttpClient,
    private strgSrv: AppstorageService

  ) {
    this.emp = this.strgSrv.getUserFromStorage();
   }

   
   UpdateNotificationsById(id) {
       //debugger;
   return this.http.get(environment.apiURL + 'Notifications/UpdateNotificationsById/' + id );
   }


   
   GetNotificationsByEmpId() {
    //debugger;
   let empId = 0;
   empId = this.emp.empId;
   return this.http.get(environment.apiURL + 'Notifications/GetNotificationsByEmpId/' + empId );
   }
}
