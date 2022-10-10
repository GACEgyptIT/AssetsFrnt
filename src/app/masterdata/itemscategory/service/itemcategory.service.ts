import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ItemsCategoryModel } from 'app/shared/models/ItemsCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class ItemcategoryService {



  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllItemsCategorys() {
  //  debugger;
    return this.http.get(environment.apiURL + 'ItemsCategories');
  }

  addItemsCategory(body: ItemsCategoryModel) {
     debugger;
    return this.http.post(environment.apiURL + 'ItemsCategories', body);
  }

  editItemsCategory(id: number, body: ItemsCategoryModel) {
    
    return this.http.put(environment.apiURL + 'ItemsCategories/' + id, body);
  }

  // deleteItemsCategory(id: number){
  //   return this.ItemsCategory.delete(environment.apiURL + `ItemsCategorys/$(id)`);
  // }
  deleteItemsCategory(id) {
    return this.http.delete(environment.apiURL + 'ItemsCategories/' + id);
  }
}
