import { Injectable } from '@angular/core';
import { AssetModel } from '../models/AssetModel';
import { AssetTrackingModel } from '../models/AssetTrackingModel';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from './shareddata.service';
import { EmployeeModel } from '../models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  usr: EmployeeModel = {};

  //   EmpImg: "../../assets/files/profileImg/default-face.jpg",
  //   usrFullName: 'User Full Name',
  //   usrAccountName: 'User Name',
  //   userRole: 'Role'
  // }

  constructor(
    private http: HttpClient,
    private shrdSrv: ShareddataService
  ) { }



  sendAssetTrackingLog(ast?: AssetModel, from?: string, to?: string  ) {
    var assetTracking = new AssetTrackingModel();
    this.shrdSrv.getCurrentUser().subscribe(res=>{
      this.usr = res;
    });
    console.log('User: ', this.usr);
    debugger; 
    assetTracking.From = from;
    assetTracking.To = to;
    assetTracking.astId = ast.astId;
    assetTracking.usrId = this.usr.empId;

    return this.http.post(environment.apiURL + 'AssetTrackings/AssetTrackings', assetTracking );
  }
  sendUserLog(action: string) {
      let body;
      this.shrdSrv.getCurrentUser().subscribe(usr=>{
        body = usr;
        if(body == null){
          body = [{}];                  // { usrAccountName: "No User Stored", ActionTime: ""};
        } 
      });
      Object.assign(body, {Action: action} );
      return this.http.post(environment.apiURL + 'UserActivitiesLogs/UserActivitiesLogs', body );
    }

}
