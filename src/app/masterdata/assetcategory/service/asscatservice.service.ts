import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AssetCategoryModel } from 'app/shared/models/AssetCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class AsscatserviceService {

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllCategorys() {
  //  
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/GetAssetCategory');
  }

  addCategory(body: AssetCategoryModel) {
     debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/addAssetCategory/', body);
  }

  editCategory(id: number, body: AssetCategoryModel) {
    debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/updateAssetCategory/' + id, body);
  }

  isCategoryCodeExist(categorycode) {
    return this.http.get(environment.apiURL + 'Assets/isCategoryCodeExist/' + categorycode);
  }

  deleteCategory(id) {
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/deleteAssetCategory/' + id);
  }

  incrementCategoryCode() {
    debugger;
    return this.http.get(environment.apiURL + 'Assets/incrementCategoryCode');
  }
}
