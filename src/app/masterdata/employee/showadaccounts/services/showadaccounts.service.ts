import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowadaccountsService {

  constructor(private http: HttpClient) { }


    getAllArchives() {
    //  debugger;
      return this.http.get(environment.apiURL + 'ADArchiveAccounts');
    }
    getAllServices() {
    //   debugger;
        return this.http.get(environment.apiURL + 'ADServiceAccounts');
      }
    deleteSelectedArchives(body) {
      // debugger;
      return this.http.post(environment.apiURL + 'ADArchiveAccounts/DeleteSelectedArchives/', body );
    }
    deleteSelectedServices(body) {
      // debugger;
      return this.http.post(environment.apiURL + 'ADServiceAccounts/DeleteSelectedServices/', body );
    }
}
