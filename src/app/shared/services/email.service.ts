import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
//import { EmployeeModel } from '../models/EmployeeModel';
import { EmployeeModel } from '../models/EmployeeModel';
import { AppstorageService } from './appstorage.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient, private strSrv: AppstorageService) { }


  sendEmailEmployeeActivation(body: EmployeeModel) {
    
  //  let user = JSON.stringify(this.strSrv.getUserFromStorage()) 
       let user = this.strSrv.getUserFromStorage();

      Object.assign(body, {userAccName: user.usrAccountName} );   

    return this.http.post(environment.apiURL + 'Emails/', body);

  }

  // sendUserLog(action: string) {
  //   //  
  //     this.getUserFromStorage();
  //     let body = this.getUserFromStorage();
  //     if(body == null){
  //       body = [{}];                  // { usrAccountName: "No User Stored", ActionTime: ""};
  //     } 
  
  //     Object.assign(body, {Action: action} );     
  //     return this.http.post(environment.apiURL + 'UserActivitiesLogs/UserActivitiesLogs', body );
  
  //   }
}
