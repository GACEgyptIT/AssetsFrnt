import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetBrandModel } from 'app/shared/models/AssetBrandModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetbrandService {

  constructor(private http: HttpClient) { }

  getAllBrands() {
    //debugger;
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/GetAssetBrands');
  }

  addBrandType(body: AssetBrandModel) {
     //debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/addAssetBrand', body);
  }

  // addMultipleBrandsTypes(body) {
  //   //debugger;
  //   return this.http.post(environment.apiURL + 'BrandTypes/DBUpdateBrandsTypes', body);
  // }
  editBrandType(id: number, body: AssetBrandModel) {
    //debugger;
    return this.http.post(environment.apiURL + 'AssetCatTypBrnd/updateAssetBrand/' + id, body);
  }

  deleteBrandType(id) {
    //debugger;
    return this.http.get(environment.apiURL + 'AssetCatTypBrnd/deleteAssetBrand/' + id);
  }

  isBrandCodeExist(brandcode) {
    return this.http.get(environment.apiURL + 'Assets/isBrandCodeExist/' + brandcode);
  }
  incrementBrandCode(typId) {
    //debugger;
    return this.http.get(environment.apiURL + 'Assets/incrementBrandCode/' + typId);
  }
}
