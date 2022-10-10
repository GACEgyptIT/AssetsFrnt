import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RoleModel } from 'app/shared/models/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(environment.apiURL + 'Roles');
  }

  addRole(body: RoleModel) {
    return this.http.post(environment.apiURL + 'Roles', body);
  }

  editRole(id: number, body: RoleModel) {
    return this.http.put(environment.apiURL + 'Roles/' + id, body);
  }

  // deleteRole(id: number){
  //   return this.Role.delete(environment.apiURL + `Roles/$(id)`);
  // }
  deleteRole(id) {
    return this.http.delete(environment.apiURL + 'Roles/' + id);
  }
}
