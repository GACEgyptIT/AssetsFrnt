import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OperatorModel } from 'app/shared/models/OperatorModel';

@Injectable({
  providedIn: 'root'
})
export class OperatorrateplanService {


  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllOperatorRatePlans() {
  //  
    return this.http.get(environment.apiURL + 'OperatorRatePlans');
  }

  addOperatorRatePlans(body: OperatorModel) {

    return this.http.post(environment.apiURL + 'OperatorRatePlans', body);
  }

  editOperatorRatePlans(id: number, body: OperatorModel) {
    return this.http.put(environment.apiURL + 'OperatorRatePlans/' + id, body);
  }

  // deleteEmployee(id: number){
  //   return this.Employee.delete(environment.apiURL + `OperatorRatePlans/$(id)`);
  // }
  deleteOperatorRatePlans(id) {
    debugger;   
    return this.http.delete(environment.apiURL + 'OperatorRatePlans/' + id);
  }
}
