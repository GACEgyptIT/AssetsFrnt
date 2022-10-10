import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupplierModel } from 'app/shared/models/SupplierModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {



  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllSuppliers() {
  //  
    return this.http.get(environment.apiURL + 'Suppliers');
  }

  addSupplier(body: SupplierModel) {
    debugger;   
    return this.http.post(environment.apiURL + 'Suppliers', body);
  }

  editSupplier(id: number, body: SupplierModel) {
    return this.http.put(environment.apiURL + 'Suppliers/' + id, body);
  }

  // deleteSupplier(id: number){
  //   return this.Supplier.delete(environment.apiURL + `Suppliers/$(id)`);
  // }
  deleteSupplier(id) {
    return this.http.delete(environment.apiURL + 'Suppliers/' + id);
  }
}
