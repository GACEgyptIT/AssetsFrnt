import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PrivilegeModel } from 'app/shared/models/PrivilegeModel';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllPrivileges() {
  //  
    return this.http.get(environment.apiURL + 'Privileges');
  }

  addPrivilege(body: PrivilegeModel) {
    
    return this.http.post(environment.apiURL + 'Privileges', body);
  }
  addMultiplePrivilege(body) {
    
    return this.http.post(environment.apiURL + 'Privileges/DBUpdatePrivileges', body);
  }

  editPrivilege(id: number, body: PrivilegeModel) {
    return this.http.put(environment.apiURL + 'Privileges/' + id, body);
  }

  // deletePrivilege(id: number){
  //   return this.Privilege.delete(environment.apiURL + `Privileges/$(id)`);
  // }
  deletePrivilege(id) {
    return this.http.delete(environment.apiURL + 'Privileges/' + id);
  }
}
