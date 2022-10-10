import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { OprAccNumberModel } from 'app/shared/models/OprAccNumberModel';

@Injectable({
  providedIn: 'root'
})
export class OpraccnumberService {


  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllOprAccNumbers() {
  //  
    return this.http.get(environment.apiURL + 'OprAccNumbers');
  }

  addOprAccNumbers(body: OprAccNumberModel) {
//    
    return this.http.post(environment.apiURL + 'OprAccNumbers', body);
  }

  editOprAccNumbers(id: number, body: OprAccNumberModel) {
    return this.http.put(environment.apiURL + 'OprAccNumbers/' + id, body);
  }

  // deleteEmployee(id: number){
  //   return this.Employee.delete(environment.apiURL + `OprAccNumbers/$(id)`);
  // }
  deleteOprAccNumbers(id) {
    return this.http.delete(environment.apiURL + 'OprAccNumbers/' + id);
  }
}
