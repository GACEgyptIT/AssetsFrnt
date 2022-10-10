import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OperatorModel } from 'app/shared/models/OperatorModel';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllOperators() {
  //  
    return this.http.get(environment.apiURL + 'Operators');
  }

  addOperator(body: OperatorModel) {
//    
    return this.http.post(environment.apiURL + 'Operators', body);
  }

  editOperator(id: number, body: OperatorModel) {
    return this.http.put(environment.apiURL + 'Operators/' + id, body);
  }

  // deleteEmployee(id: number){
  //   return this.Employee.delete(environment.apiURL + `Operators/$(id)`);
  // }
  deleteOperator(id) {
    return this.http.delete(environment.apiURL + 'Operators/' + id);
  }
}
