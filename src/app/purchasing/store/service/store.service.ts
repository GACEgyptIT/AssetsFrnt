import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllStores() {
    return this.http.get(environment.apiURL + 'Stores');
  }

  addStore(body: EmployeeModel) {
    return this.http.post(environment.apiURL + 'Stores', body);
  }

  editStore(id: number, body: EmployeeModel) {
    return this.http.put(environment.apiURL + 'Stores/' + id, body);
  }

  deleteStore(id) {
    return this.http.delete(environment.apiURL + 'Stores/' + id);
  }
}
