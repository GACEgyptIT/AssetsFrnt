import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferModel } from 'app/shared/models/TransferModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {


  constructor(private http: HttpClient) { }

  getAllTransfers() {
 
    return this.http.get(environment.apiURL + 'Transfers/GetTransfersList');
  }

  addTransfer(body: TransferModel) {
    debugger;
    return this.http.post(environment.apiURL + 'Transfers', body);
  }
  editTransfer(body: TransferModel) {
    debugger;
    let id = body.TransferId;
    return this.http.put(environment.apiURL + 'Transfers/PutTransfer' + id, body);
  }
  GetTransferById(id) {
    return this.http.get(environment.apiURL + 'Transfers/GetTransferById/' + id);
  }

  deleteSelectedImportedTransfers(body) {
        return this.http.post(environment.apiURL + 'Transfers/DeleteSelected/', body );
  }
  GetAllStatus() {
  //  debugger;
    return this.http.get(environment.apiURL + 'Transfers/TransfersStatus');
  }
}
