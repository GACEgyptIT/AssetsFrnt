import { Component, OnInit } from '@angular/core';
import { ADServiceAccModel } from 'app/shared/models/ADServiceAccModel';
import { ShowadaccountsService } from './services/showadaccounts.service';
import { ADArchiveAccModel } from 'app/shared/models/ADArchiveAccModel';

@Component({
  selector: 'app-showadaccounts',
  templateUrl: './showadaccounts.component.html',
  styleUrls: ['./showadaccounts.component.css']
})
export class ShowadaccountsComponent implements OnInit {
  public AllAccounts: any = [];

  public ADServiceAccs: ADServiceAccModel[] = [];
  public SelectedADServiceAccs: ADServiceAccModel[] = [];
  public ADServiceAccsTemp: ADServiceAccModel[] = [];
  
  public ADArchiveAccs: ADArchiveAccModel[] = [];
  public SelectedADArchiveAccs: ADArchiveAccModel[] = [];
  public ADArchiveAccsTemp: ADArchiveAccModel[] = [];

  public loading = false;

  constructor(private shwSrv: ShowadaccountsService) { 
    this.onShowBy();

  }

  ngOnInit(): void {
  }
  
  onShowBy(e?){
    debugger;
    this.loading = true;
    //Services
    this.shwSrv.getAllServices().subscribe((accs: ADServiceAccModel[]) => {
             debugger;
             this.ADServiceAccs = accs;
             this.loading = false;
      }, error => {
             this.loading = false;
             if(error.message.includes('Http failure response for http://')) {
             //  this.notifcationMessegeTimer('Server connection Error / Data is not updated');
             }
     });
     //Archives
     this.shwSrv.getAllArchives().subscribe((accs: ADArchiveAccModel[]) => {
             debugger;
             this.ADArchiveAccs = accs;
 
             debugger;
             this.AllAccounts = [];
             if(e == undefined || e.target.value == 'ShowAll'){
                this.AllAccounts = this.ADServiceAccs;
                this.ADArchiveAccs.forEach(acc=>{
                    this.AllAccounts.push(acc);
                });
             } if(e.target.value == 'ServiceAccounts'){
                this.AllAccounts = this.ADServiceAccs;
              } if(e.target.value == 'ArchiveAccounts'){
                this.AllAccounts = this.ADArchiveAccs;
             }
             this.loading = false;
      }, error => {
             this.loading = false;
             if(error.message.includes('Http failure response for http://')) {
             //  this.notifcationMessegeTimer('Server connection Error / Data is not updated');
             }
     });
     this.loading = false;
   

  }

  onDeleteAllSellectedSA() {
    // debugger;
    this.loading = true;
    if(this.SelectedADServiceAccs.length == 0) {
    //  this.notifcationMessegeTimer('No Record Selected');
    } else {
      let ids = [];
      this.SelectedADServiceAccs.forEach(em => {
        ids.push(em.ADServiceAccountId);
      });
      this.shwSrv.deleteSelectedServices(ids).subscribe((dltemps: ADServiceAccModel[]) => {
        this.SelectedADServiceAccs = [];
        this.loading = false;
      }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')){
        //  this.notifcationMessegeTimer( 'Server connection Error / Data is not updated');
        }
      });
    }
  }
  onDeleteAllSellectedArchive() {
    // debugger;
    this.loading = true;
    if(this.SelectedADArchiveAccs.length == 0) {
  //    this.notifcationMessegeTimer('No Record Selected');
    } else {
      let ids = [];
      this.SelectedADArchiveAccs.forEach(em => {
        ids.push(em.ADArchiveAccountId);
      });
      this.shwSrv.deleteSelectedArchives(ids).subscribe((dltemps: ADArchiveAccModel[]) => {
        this.SelectedADArchiveAccs = [];
        this.loading = false;
      }, error => {
        this.loading = false;
        if(error.message.includes('Http failure response for http://')){
     //     this.notifcationMessegeTimer( 'Server connection Error / Data is not updated');
        }
      });
    }
  }

}
