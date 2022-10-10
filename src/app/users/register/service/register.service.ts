import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
//import { EmployeeModel } from 'app/shared/models/UserModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  UserAuthentication() {
    return this.http.get(environment.apiURL + 'GetUserLogin/{Username}/{Password}')
  }
  ImportADUsers() {
 // debugger;
    return this.http.get('http://api.adauth.local:1035/api/auth/users')
  }
  addImportedUsers(body) {
 //   debugger;
    return this.http.post(environment.apiURL + 'Users/addImportedUsers', body);
  }
  getAllUsers() {
    // debugger;
    return this.http.get(environment.apiURL + 'Users');
  }
  getAllUsersWithEmails() {
    // debugger;
      return this.http.get(environment.apiURL + 'Users/GetUsersWithEmail');
    }
  getAllImportedUsers() {
    //  debugger;
      return this.http.get(environment.apiURL + 'Users/GetAllImportedUsers');
  }
  addUser(body: EmployeeModel) {
      debugger;
    return this.http.post(environment.apiURL + 'Users', body);
  }
  saveUsers(body) {
        // debugger;
        return this.http.post(environment.apiURL + 'Users/SaveUsers', body);
  }
  editUser(id: number, body: EmployeeModel) {
     debugger;
    return this.http.put(environment.apiURL + 'Users/' + id, body);
  }
  GetUserByCode(hrcode) {
    return this.http.get(environment.apiURL + 'Users/GetUserByCode/' + hrcode);
  }
  // deleteUser(id: number){
  //   return this.User.delete(environment.apiURL + `Users/$(id)`);
  // }
  deleteUser(id) {
    return this.http.delete(environment.apiURL + 'Users/' + id);
  }
  deleteALLimportedUsers() {
    return this.http.delete(environment.apiURL + 'Users/DeleteAllImportedUsers' );
  }
  deleteALLUsers() {
    return this.http.delete(environment.apiURL + 'Users/DeleteAllUsers' );
  }
  deleteSelectedImportedUsers(body) {
    debugger;
    return this.http.post(environment.apiURL + 'Users/DeleteSelected/', body );
  }
  deleteSelectedUsers(body) {
    debugger;
    return this.http.post(environment.apiURL + 'Users/DeleteSelectedUsers/', body );
  }

  // uploadEmplyeeImage(body) {
  //   debugger;
  //   return this.http.post(environment.apiURL + 'Users/UploadEmplyeeImage/', body );
  //   return this.http.post(environment.apiURL + 'ExcelAsset/UploadExcelAsset', formData, httpOptions)
  // }
  uploadEmplyeeImage(formData: FormData) {
      debugger;
      let headers = new HttpHeaders();
  
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
  
      const httpOptions = { headers: headers };
   //   debugger;
      return this.http.post(environment.apiURL + 'Users/UploadEmplyeeImage/', formData, httpOptions)
    }
}
