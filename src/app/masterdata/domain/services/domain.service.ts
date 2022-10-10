import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';

@Injectable({
  providedIn: 'root'
})
export class DomainService {


  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllDomains() {
  //  debugger;
    return this.http.get(environment.apiURL + 'Domains');
  }

  addDomain(body: GenaricEmailModel) {
//    debugger;
    return this.http.post(environment.apiURL + 'Domains', body);
  }

  editDomain(id: number, body: GenaricEmailModel) {
    return this.http.put(environment.apiURL + 'Domains/' + id, body);
  }

  // deleteDomain(id: number){
  //   return this.Domain.delete(environment.apiURL + `Domains/$(id)`);
  // }
  deleteDomain(id) {
    return this.http.delete(environment.apiURL + 'Domains/' + id);
  }
}
