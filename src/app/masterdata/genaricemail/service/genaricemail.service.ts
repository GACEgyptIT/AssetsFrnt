import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';

@Injectable({
  providedIn: 'root'
})
export class GenaricemailService {

  // Categorys: any = [];
  constructor(private http: HttpClient) { }

  assignEmployeestoGmail(body) {
    debugger;
    return this.http.post(environment.apiURL + 'GenaricEmails/AssignEmployeestoGmail', body);
  }

  getAllGenaricemails() {
  //  debugger;
    return this.http.get(environment.apiURL + 'Genaricemails');
  }

  addGenaricemail(body: GenaricEmailModel) {
//    debugger;
    return this.http.post(environment.apiURL + 'Genaricemails', body);
  }

  editGenaricemail(id: number, body: GenaricEmailModel) {
    return this.http.put(environment.apiURL + 'Genaricemails/' + id, body);
  }

  // deleteGenaricemail(id: number){
  //   return this.Genaricemail.delete(environment.apiURL + `Genaricemails/$(id)`);
  // }
  deleteGenaricemail(id) {
    return this.http.delete(environment.apiURL + 'Genaricemails/' + id);
  }


  UploadExcel(file: FormData) {
    debugger;
    let headers = new HttpHeaders();
    // let body = {
    //   file: file,
    //   usr: this.usr
    // }

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
  //  headers.append('usr', this.usr)

    const httpOptions = { headers: headers };
    

    // this.sendUserLog();

    return this.http.post(environment.apiURL + 'GenaricEmails/UploadExcelGEmails', file, httpOptions)
  }
}
