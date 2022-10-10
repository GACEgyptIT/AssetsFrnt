import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SOHModel } from 'app/shared/models/SOHModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(
    private http: HttpClient, private strgSrv: AppstorageService
    ) { }

  getAllSOHs() {
  //  
    return this.http.get(environment.apiURL + 'SOHs');
  }
  getLogsBySOHId(astId: number) {
      
      return this.http.get(environment.apiURL + 'SOHTrackingss/getLogsBySOHId/' + astId);
  }
  getSOHId(astId: number) {
    
    return this.http.get(environment.apiURL + 'SOHss/getBySOHId/' + astId);
  }

  GetAsssetByCode(SOHcode) {
    return this.http.get(environment.apiURL + 'SOHss/GetAsssetByCode/' + SOHcode);
  }

  GetAsssetByDailNumber(dailNumber) {
    return this.http.get(environment.apiURL + 'SOHss/GetAsssetByDailNumber/' + dailNumber);
  }
  
  GetOperatorPlansByOpId(oprId) {
    return this.http.get(environment.apiURL + 'OperatorRatePlans/GetOperatorPlansByOpId/' + oprId);
  }
  GetAccountsNumbersByOpId(oprId) {
    return this.http.get(environment.apiURL + 'OprAccNumbers/GetAccountsNumbersByOpId/' + oprId);
  }
  isAsssetCodeExist(SOHcode) {
    return this.http.get(environment.apiURL + 'SOHss/isAsssetCodeExist/' + SOHcode);
  }
  GetDailNumber(dailnumber) {
    debugger;
    return this.http.get(environment.apiURL + 'SOHss/getDailNumber/' + dailnumber);
  }
  GetSerialNumber(serialnumber) {
    debugger;
    return this.http.get(environment.apiURL + 'SOHss/getSerialNumber/' + serialnumber);
  }

  addSOH(body: SOHModel) {
   //   
    return this.http.post(environment.apiURL + 'SOHs', body);
  }

  editSOH(id: number, body: SOHModel) {
     
    return this.http.put(environment.apiURL + 'SOHs/' + id, body);
  }
  editMultipleSOH(id: number, body: SOHModel) {
   return this.http.put(environment.apiURL + 'SOHs/' + id, body);
  }

  deleteSOH(id) {
    return this.http.delete(environment.apiURL + 'SOHs/' + id);
  }
  assignSOHToEmp(body) {
    debugger;
    return this.http.post(environment.apiURL + 'SOHss/assignSOHsToEmp', body);
  }
    UploadExcel(file: FormData) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    //  headers.append('usr', this.usr)

      const httpOptions = { headers: headers };
      return this.http.post(environment.apiURL + 'ExcelSOH/UploadExcelSOH', file, httpOptions)
    }
    getAllUploadedSOHs() {
      return this.http.get(environment.apiURL + 'ExcelSOH/GetallUploadedSOH');
    }
    saveUploadedSOHs(body: SOHModel[]) {
         return this.http.post(environment.apiURL + 'ExcelSOH/saveuploadedSOHs', body);
    }
    deleteAllUploadedSOHs( body) {
 //   
    return this.http.delete(environment.apiURL + 'ExcelSOH/DeleteAlluploadedSOHs', body);
    }
    deleteSelectedUploadedSOHs(body) {
      return this.http.post(environment.apiURL + 'ExcelSOH/DeleteSelectedSOHs/', body );
    }
    
    deleteSelectedSOHs(body) {
   //   
      return this.http.post(environment.apiURL + 'SOHss/DeleteSelectedSOHs/', body );
    }
}
