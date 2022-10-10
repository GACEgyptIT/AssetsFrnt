import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { InvoicesModel } from 'app/shared/models/InvoicesModel';
import { CostCenterModel } from 'app/shared/models/CostCenterModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
// import { LegendItem, ChartType, LbdChartComponent } from '../reports/lbd-chart/lbd-chart.component';    //lbd-chart/lbd-chart.component';      

@Injectable({
  providedIn: 'root'
})
export class InvoicemngService implements OnInit {
  emp: EmployeeModel;
  constructor(
    private http: HttpClient,    
    private strgSrv: AppstorageService
    ) { 
    this.emp = this.strgSrv.getUserFromStorage();
  }

  ngOnInit(){
  }

  getAllInvoices(from: Date, to: Date) {
   // //debugger;
    let empId = 0;
    empId = this.emp.empId;
    const body = { 
      empId: empId,
      from: from,
      to: to
    } 
    return this.http.post(environment.apiURL + 'Invoices/GetInvoicesFromToDate', body);
  }
  getInvoiceById(id: number) {
   //   //debugger;
     return this.http.get(environment.apiURL + 'Invoices/getInvoiceById/' + id);
  }
  addInvoice(body: InvoicesModel) {
    //debugger;
    this.emp = this.strgSrv.getUserFromStorage();
    body.empId  = this.emp.empId;
    body.EmployeeName  = this.emp.empFullName;
    return this.http.post(environment.apiURL + 'Invoices/AddInvoices', body);
  }

  UploadInvoice(file: FormData, inv: InvoicesModel) {
     //debugger;
        let headers = new HttpHeaders();
        // let body = {
        //   file: file,
        //   usr: this.usr
        // }
    
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
      //  headers.append("AAAAAA", "AAAAAA");
    
        const httpOptions = { headers: headers };

        // this.sendUserLog();
    
        return this.http.post(environment.apiURL + 'Invoices/PostFileUpload', file, httpOptions)
  }
  editInvoice(id: number, body: InvoicesModel) {
    //debugger;
    return this.http.post(environment.apiURL + 'Invoices/EditInvoice', body);
  }
  deleteInvoice(id) {
    //debugger;
    return this.http.get(environment.apiURL + 'Invoices/DeleteInvoice/' + id);
  }
  deleteSelectedInvoices(body) {
  //  //debugger;
    return this.http.post(environment.apiURL + 'Invoices/DeleteSelectedInvoices/', body );
  }
  invoices: InvoicesModel[];
  calculateByCategories(invs: InvoicesModel[]){
    this.invoices = invs;
    let JanTotal = 0; let FebTotal = 0; let MarTotal = 0; let AprTotal = 0; let MaiTotal = 0; let JunTotal = 0; 
    let JulTotal = 0; let AugTotal = 0; let SepTotal = 0; let OctTotal = 0; let NovTotal = 0 ; let DecTotal = 0;
    const series = [];
    const categories = [];

    invs.forEach((inv, index) => {
     // //debugger;
      if(!categories.includes(inv.ItemsCategoryName)){

        categories.push(inv.ItemsCategoryName);
        // //debugger;
        JanTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '01');
        FebTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '02');
        MarTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '03');
        AprTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '04');
        MaiTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '05');
        JunTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '06');
        JulTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '07');
        AugTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '08');
        SepTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '09');
        OctTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '10');
        NovTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '11');
        DecTotal += this.CalculateMonthTotalByCategory(inv.ItemsCategoryName, '12');
        let Total = JanTotal + FebTotal + MarTotal + AprTotal + MaiTotal + MaiTotal + JunTotal + JunTotal + JulTotal + AugTotal +  SepTotal +  OctTotal + NovTotal + DecTotal ;

        series.push([ JanTotal, FebTotal, MarTotal, AprTotal, MaiTotal, JunTotal, JulTotal, AugTotal, SepTotal, OctTotal, NovTotal, DecTotal, inv.ItemsCategoryName, Total ]);

        JanTotal = 0; FebTotal = 0; MarTotal = 0; AprTotal = 0; MaiTotal = 0; JunTotal = 0; 
        JulTotal = 0; AugTotal = 0; SepTotal = 0; OctTotal = 0; NovTotal = 0 ; DecTotal = 0;
     
      } 
    });
    return series;
  }
  CalculateMonthTotalByCategory(cat, month: String): number{
    let amount = 0;
    this.invoices.forEach(inv =>{
      if(inv.ItemsCategoryName == cat){
        let invdate = new Date(inv.invDate);
        const invMonth = ("0" + (invdate.getMonth() + 1)).slice(-2);
        if(inv.invAmount !== undefined && invMonth == month){
            amount += inv.invAmount;
        }
      }
    });
    return amount;
  }
  /////////// by Cost Center ///////////

  calculateByCategoriesForCC(invs: InvoicesModel[], from, to){
    this.invoices = invs;
    const records = []; 

    invs.forEach((inv: InvoicesModel, index) => {
        let record = { catName: '', ccName: '', catTotal: 0 }; 

        record.catTotal = this.CalculateCCTotalByCategory(inv.ItemsCategoryName, inv.CostCenterName, from, to);
        record.catName = inv.ItemsCategoryName;
        record.ccName = inv.CostCenterName;
        if((!records.some((item) => item.ccName == inv.CostCenterName)) || (!records.some((item) => item.catName == inv.ItemsCategoryName)) ){
          records.push(record);
        }
    });
  //  //debugger;
    return records;
  }

  CalculateCCTotalByCategory(cat, cc, from,to): number{
    let amount = 0;
    this.invoices.forEach((inv: InvoicesModel) =>{
      if(inv.ItemsCategoryName == cat && inv.CostCenterName == cc){
        let invdate = new Date(inv.invDate);
        if(inv.CostCenterName === cc  && invdate >= from && invdate <= to){
            amount += inv.invAmount;
        }
      }
    });
    return amount;
  }

  sendAttachedInv(file: FormData) {
    ////debugger;
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

    return this.http.post(environment.apiURL + 'Invoices/PostFileUpload', file, httpOptions)
  }
}
