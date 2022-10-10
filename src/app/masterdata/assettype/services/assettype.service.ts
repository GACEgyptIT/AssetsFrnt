import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';

@Injectable({
  providedIn: 'root'
})
export class AssettypeService {

  constructor(private http: HttpClient) { }

  getAllAssetsTypes() {
  // 
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/GetAssetTypes');
  }

  addAssetType(body: AssetTypeModel) {
 debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/addAssetType', body);
  }
  isTypeCodeExist(typecode) {
    return this.http.get(environment.apiURL + 'Assets/istypeCodeExist/' + typecode);
  }
  editAssetType(id: number, body: AssetTypeModel) {
    debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/updateAssetType/' + id, body);
  }

  deleteAssetType(id) {
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/deleteAssetType/' + id);
  }

  incrementTypeCode(catId) {
    debugger;
    return this.http.get(environment.apiURL + 'Assets/incrementTypeCode/' + catId);
  }
}
