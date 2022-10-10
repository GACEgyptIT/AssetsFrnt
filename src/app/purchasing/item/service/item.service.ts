import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from 'app/shared/models/ItemsModel';
import { SOHModel } from 'app/shared/models/SOHModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(environment.apiURL + 'Items');
  }
  getItemById(id: number) {

    return this.http.get(environment.apiURL + 'Items/getItemById/' + id);
  }

  getSOHItem(sohSearch: SOHModel) {
    return this.http.post(environment.apiURL + 'Items/getSOHItem', sohSearch);
  }
  getConsumptionItem(sohSearch: SOHModel) {
    return this.http.post(environment.apiURL + 'Items/getConsumptionItem', sohSearch);
  }
  

  addItem(body: ItemModel) {
    return this.http.post(environment.apiURL + 'Items', body);
  }

  editItem(id: number, body: ItemModel) {
    return this.http.put(environment.apiURL + 'Items/' + id, body);
  }

  deleteItem(id) {
    return this.http.delete(environment.apiURL + 'Items/' + id);
  }
}

