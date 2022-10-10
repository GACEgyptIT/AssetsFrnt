import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';
import { DepartmentModel } from 'app/shared/models/DepartmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllDepartments() {
 //   debugger;
    return this.http.get(environment.apiURL + 'Departments');
  }

  addDepartment(body: DepartmentModel) {
//    
    return this.http.post(environment.apiURL + 'Departments', body);
  }

  editDepartment(id: number, body: DepartmentModel) {
    return this.http.put(environment.apiURL + 'Departments/' + id, body);
  }

  // deleteDepartment(id: number){
  //   return this.Department.delete(environment.apiURL + `Departments/$(id)`);
  // }
  deleteDepartment(id) {
    return this.http.delete(environment.apiURL + 'Departments/' + id);
  }
}
