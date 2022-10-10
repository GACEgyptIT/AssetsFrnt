import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CompanyModel } from 'app/shared/models/CompanyModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {



  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllCompanys() {
  //  
    return this.http.get(environment.apiURL + 'Companies');
  }

  addCompany(body: CompanyModel) {
//    
    return this.http.post(environment.apiURL + 'Companies', body);
  }

  editCompany(id: number, body: CompanyModel) {
    return this.http.put(environment.apiURL + 'Companies/' + id, body);
  }

  // deleteCompany(id: number){
  //   return this.Company.delete(environment.apiURL + `Companys/$(id)`);
  // }
  deleteCompany(id) {
    return this.http.delete(environment.apiURL + 'Companies/' + id);
  }
}
