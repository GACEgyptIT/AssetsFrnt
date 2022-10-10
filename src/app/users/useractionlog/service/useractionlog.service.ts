import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseractionlogService {

  constructor(private http: HttpClient) { }

  getAllUserLogs() {
    //  debugger;
      return this.http.get(environment.apiURL + 'UserActivitiesLogs');
    }
}
