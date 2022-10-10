import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AbstractControl } from '@angular/forms';
import { EmployeesUploadModel } from 'app/shared/models/EmployeeUploadModel';
import { EmployeeHRMSModel } from 'app/shared/models/EmployeeHRMSModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  EmployeeAuthentication() {
    return this.http.get(environment.apiURL + 'GetEmployeeLogin/{Username}/{Password}')
  }
  ImportADEmployees() {
  // 
    return this.http.get('http://api.adauth.local:1035/api/auth/users')
  }
  addImportedAccounts(body) {
 //   
    return this.http.post(environment.apiURL + 'Employees/addImportedAccounts', body);
  }
  UploadExcel(file: FormData) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    //debugger;
    return this.http.post(environment.apiURL + 'ExcelEmployee/UploadExcelEmployee', file, httpOptions)
  }
  saveUploadedEmployees(body: EmployeesUploadModel[]) {
       // debugger;
        return this.http.post(environment.apiURL + 'ExcelEmployee/SaveUploadedEmployees', body);
  }
  getAllEmployees() {
    // debugger;
    return this.http.get(environment.apiURL + 'Employees/GetEmployeesNameOnly');
  }

  getAllUploadedEmployees() {
    return this.http.get(environment.apiURL + 'ExcelEmployee/GetallUploadedEmployees');
  }


  
  getAllEmployeesWithAssets() {
      return this.http.get(environment.apiURL + 'Employees/GetEmployeesWithAssets');
  }
  getAllEmployeesWithEmails(){
    return this.http.get(environment.apiURL + 'Employees/GetEmployeesWithEmails');
  }
  getSelectedEmployeesWithEmails(empIds:EmployeeModel[]){
   // debugger;
    return this.http.post(environment.apiURL + 'Employees/GetSelectedEmployeesWithEmails' , empIds);
  }
  getAllImportedEmployees() {

      return this.http.get(environment.apiURL + 'Employees/GetAllImportedEmployees');
  }
  addEmployee(body: EmployeeModel) {
    
    return this.http.post(environment.apiURL + 'Employees', body);
  }
  saveEmployees(body) {
        
        return this.http.post(environment.apiURL + 'Employees/SaveAccounts', body);
  }
  editEmployee(id: number, empvm: EmployeeModel) {
    debugger;   
    return this.http.post(environment.apiURL + 'Employees/PutEmployee/' + id, empvm);
  }

  createEmployeeUser(id: number, empvm: EmployeeModel) {
    debugger;   
    return this.http.post(environment.apiURL + 'Employees/createEmployeeUser/' + id, empvm);
  }

  
  GetEmployeeByCode(hrcode) {
    return this.http.get(environment.apiURL + 'Employees/GetEmployeeByCode/' + hrcode);
  }
  GetEmployeeById(id) {
    return this.http.get(environment.apiURL + 'Employees/GetEmployeeById/' + id);
  }
  changeEmployeeActivation(empId?: number) {
     
    return this.http.get(environment.apiURL + 'Employees/changeEmployeeActivation/' + empId);
  }
  deleteEmployee(id) {
    
    return this.http.delete(environment.apiURL + 'Employees/' + id);
  }
  deleteALLimportedEmployees() {
    return this.http.delete(environment.apiURL + 'Employees/DeleteAllImportedEmployees' );
  }
  deleteALLEmployees() {
    return this.http.delete(environment.apiURL + 'Employees/DeleteAllEmployees' );
  }
  deleteSelectedImportedEmployees(body) {
    // 
    return this.http.post(environment.apiURL + 'Employees/DeleteSelected/', body );
  }
  deleteSelectedUploadedEmployees(body) {
    return this.http.post(environment.apiURL + 'Employees/DeleteSelectedUploadedEmployees/', body );
  }
  DeleteSelectedEmployees(body) {
    debugger;
    return this.http.post(environment.apiURL + 'Employees/DeleteSelectedEmployees/', body );
  }

  // uploadEmplyeeImage(body) {
  //   
  //   return this.http.post(environment.apiURL + 'Employees/UploadEmplyeeImage/', body );
  //   return this.http.post(environment.apiURL + 'ExcelEmployee/UploadExcelEmployee', formData, httpOptions)
  // }
  uploadEmplyeeImage(formData: FormData) {
      // 
      let headers = new HttpHeaders();
  
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
  
      const httpOptions = { headers: headers };
   //   
      return this.http.post(environment.apiURL + 'Employees/UploadEmplyeeImage/', formData, httpOptions)
    }

    getLoginTokenforHRMS(){
      debugger;
      let credentials = {
        "username": "abubakr.fathy",
        "password": "Admin@123"
      }
    //  return this.http.post('https://authapi.gacegy.local/api/login', credentials)

    return this.http.post('https://localhost:44338/api/login', credentials)
    }
    ImportFromHRMS(token) {
       //  debugger;
         var header = {
          headers: new HttpHeaders()
            .set('Authorization',  'Bearer ' + token)
        }
        return this.http.get('https://directoryapi.gacegy.local/Employee/GetAllEmployeeData', header)
    }
    UpdateFromHRMS(emps: EmployeeHRMSModel[]) {
      //  debugger;
        return this.http.post(environment.apiURL + 'Employees/UpdateEmployeesFromHRMS', emps)
    }

  // noticationMessegeTimer(messege : string) {
  //   
  //   var x  = setInterval(() => 
  //    {
  //         return this.notificationMessage = '';
  //    },4000);
  //         return this.notificationMessage = messege;
  //  }

  emailsIdsTempValidation: any = [];
  // emailIsExistValidator(emailControl?: AbstractControl) {
  //   
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (this.validateEmail(emailControl.value)) {
  //         resolve(true);  //{ emailIsExist: true }
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1000);
  //   });
  // }

  // validateEmail(emailAddress?: string) {
  //   
  //   // const EmailsList = ['IT@gac.com', 'OPS@gac.com', 'ZZZZ', 'WWWWW'];
  //   return (this.emailsIdsTempValidation.indexOf(emailAddress) > -1);
  // }
}
