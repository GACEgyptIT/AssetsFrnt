import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: Http) {}

  downloadFile(): Observable<any>{
  
    return this.http.get(environment.apiURL + 'Assets/GetFile', {responseType: ResponseContentType.Blob}); //responseType: 'blob'
     
    //We are also accepting response as Blob (Binary Large Object). 
    //You may also specify any value from supporting values, such as, json, blob, arraybuffer, text.
  }
  
  downloadEmployeeFile(): Observable<any>{
  
    return this.http.get(environment.apiURL + 'Assets/GetFileEmployee', {responseType: ResponseContentType.Blob});
     
    //We are also accepting response as Blob (Binary Large Object). 
    //You may also specify any value from supporting values, such as, json, blob, arraybuffer, text.
  }

  downloadInvoiceFile(id): Observable<any>{
  debugger;
    return this.http.get(environment.apiURL + 'Invoices/GetFileInvoice/' + id, {responseType: ResponseContentType.Blob});
     
    //We are also accepting response as Blob (Binary Large Object). 
    //You may also specify any value from supporting values, such as, json, blob, arraybuffer, text.
  }
  DeleteTempInvoice(id): Observable<any>{
    debugger;
      return this.http.get(environment.apiURL + 'Invoices/DeleteTempInvoice/' + id, {responseType: ResponseContentType.Blob});
       
      //We are also accepting response as Blob (Binary Large Object). 
      //You may also specify any value from supporting values, such as, json, blob, arraybuffer, text.
    }

  downloadFileGenericEmailSample(): Observable<any>{
  
    return this.http.get(environment.apiURL + 'GenaricEmails/GetFile', {responseType: ResponseContentType.Blob});
     
    //We are also accepting response as Blob (Binary Large Object). 
    //You may also specify any value from supporting values, such as, json, blob, arraybuffer, text.
  }
   
}
