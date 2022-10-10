import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class BranchService {


  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllBranchs() {
    return this.http.get(environment.apiURL + 'Branchs');
  }

  addBranch(body: EmployeeModel) {
    return this.http.post(environment.apiURL + 'Branchs', body);
  }

  editBranch(id: number, body: EmployeeModel) {
    return this.http.put(environment.apiURL + 'Branchs/' + id, body);
  }

  deleteBranch(id) {
    return this.http.delete(environment.apiURL + 'Branchs/' + id);
  }
}
