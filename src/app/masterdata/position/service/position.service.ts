
import { PositionModel } from 'app/shared/models/PositionModel';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }
  getAllpositions() {
  //  debugger;
   return this.http.get(environment.apiURL + 'PositionTitles');
 }

 // GetAsssetByCode(assetcode) {
 //   return this.http.get(environment.apiURL + 'Assets/GetAsssetByCode/' + assetcode);
 // }

 addposition(body: PositionModel) {
   debugger;
   return this.http.post(environment.apiURL + 'PositionTitles', body);
 }

 editposition(id: number, body: PositionModel) {
//   debugger;
   return this.http.put(environment.apiURL + 'PositionTitles/' + id, body);
 }
 editMultipleposition(id: number, body: PositionModel) {
  // debugger;
  return this.http.put(environment.apiURL + 'PositionTitles/' + id, body);
 }

 deleteposition(id) {
   return this.http.delete(environment.apiURL + 'PositionTitles/' + id);
 }
}
