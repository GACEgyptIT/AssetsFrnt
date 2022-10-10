import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AssetModel } from 'app/shared/models/AssetModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetsUploadModel } from 'app/shared/models/AssetsUploadModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
//import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  emp: EmployeeModel;

  onGetCurrentuser(){
    this.emp = this.strgSrv.getUserFromStorage();
  }
  constructor(
    private http: HttpClient, private strgSrv: AppstorageService
    ) {     }

  getAllAssets() {
  //  
    return this.http.get(environment.apiURL + 'Assets');
  }
  getLogsByAssetCode(astcode: string) {
      
      return this.http.get(environment.apiURL + 'AssetTrackingss/getLogsByAssetCode/' + astcode);
  }
  getAssetId(astCode: string) {
    
    return this.http.get(environment.apiURL + 'Assets/getByAssetCode/' + astCode);
  }
  incrementAssetCode(brandId) {
    ////debugger;
    return this.http.get(environment.apiURL + 'Assets/incrementAssetCode/' + brandId);
  }

  GetAsssetByCode(assetcode) {
    return this.http.get(environment.apiURL + 'Assets/GetAsssetByCode/' + assetcode);
  }

  GetAsssetByDailNumber(dailNumber) {
    return this.http.get(environment.apiURL + 'Assets/GetAsssetByDailNumber/' + dailNumber);
  }
  
  GetOperatorPlansByOpId(oprId) {
    return this.http.get(environment.apiURL + 'OperatorRatePlans/GetOperatorPlansByOpId/' + oprId);
  }
  GetAccountsNumbersByOpId(oprId) {
    return this.http.get(environment.apiURL + 'OprAccNumbers/GetAccountsNumbersByOpId/' + oprId);
  }
  isAsssetCodeExist(assetcode) {
    return this.http.get(environment.apiURL + 'Assets/isAsssetCodeExist/' + assetcode);
  }
  isAsssetPNExist(pn) {
    return this.http.get(environment.apiURL + 'Assets/isAsssetPNExist/' + pn);
  }
  GetDailNumber(dailnumber) {
    ////debugger;
    return this.http.get(environment.apiURL + 'Assets/getDailNumber/' + dailnumber);
  }
  GetSerialNumber(serialnumber) {
    ////debugger;
    return this.http.get(environment.apiURL + 'Assets/getSerialNumber/' + serialnumber);
  }

  addAsset(body: AssetModel) {
   //debugger; 
    this.onGetCurrentuser();
    body.empHRCode = this.emp.empHRCode;
    //debugger;
    return this.http.post(environment.apiURL + 'Assets/creatAsset', body);
  }

  editAsset(id: number, body: AssetModel) {
    this.onGetCurrentuser();
    body.empHRCode = this.emp.empHRCode;
    //debugger;
    return this.http.post(environment.apiURL + 'Assets/editAsset', body);
  }
  editMultipleAsset(id: number, body: AssetModel) {
   return this.http.put(environment.apiURL + 'Assets/' + id, body);
  }

  deleteAsset(id) {
    return this.http.delete(environment.apiURL + 'Assets/' + id);
  }
  assignAssetToEmp(body) {
    ////debugger;
    return this.http.post(environment.apiURL + 'Assets/assignAssetsToEmp', body);
  }
    // upload excel
    UploadExcel(file: FormData) {

      let headers = new HttpHeaders();
      // let body = {
      //   file: file,
      //   usr: this.usr
      // }

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    //  headers.append('usr', this.usr)

      const httpOptions = { headers: headers };
      

      // this.sendUserLog();

      return this.http.post(environment.apiURL + 'ExcelAsset/UploadExcelAsset', file, httpOptions)
    }
    getAllUploadedAssets() {
      return this.http.get<AssetsUploadModel[]>(environment.apiURL + 'ExcelAsset/GetallUploadedAsset');
    }
    saveUploadedAssets(body: AssetsUploadModel[]) {
      //debugger;
        this.onGetCurrentuser();
        body.forEach(a=>{
          a.ByEmpId = this.emp.empId;
        });
        ////debugger;
        return this.http.post(environment.apiURL + 'ExcelAsset/saveuploadedassets', body);
    }
    deleteAllUploadedAssets( body) {
 //   
    return this.http.delete(environment.apiURL + 'ExcelAsset/DeleteAlluploadedAssets', body);
    }
    deleteSelectedUploadedAssets(body) {
      return this.http.post(environment.apiURL + 'ExcelAsset/DeleteSelectedAssets/', body );
    }
    
    deleteSelectedAssets(body) {
       //debugger;  
      return this.http.post(environment.apiURL + 'Assets/DeleteSelectedAssets/', body );
    }
}
