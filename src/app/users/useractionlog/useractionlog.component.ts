import { Component, OnInit } from '@angular/core';
//import { UserModel } from 'app/shared/models/UserModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { UseractionlogService } from './service/useractionlog.service';

@Component({
  selector: 'app-useractionlog',
  templateUrl: './useractionlog.component.html',
  styleUrls: ['./useractionlog.component.css']
})
export class UseractionlogComponent implements OnInit {

  public Logs : EmployeeModel[] = [];
  public TempLogs : EmployeeModel[] = [];
  constructor(private logSrv: UseractionlogService) { }

  ngOnInit(): void {
    this.onGetUserLog();
  }

  onGetUserLog() {
    //    
          this.logSrv.getAllUserLogs().subscribe((rls: EmployeeModel[]) => {
            
                 this.Logs = rls;
                 this.TempLogs = rls;
               //   this.loading = false;
            }, error => {
                  console.log('error ...' ,  error.message);
              //    this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                 //   this.noticationMessegeTimer('Server connection Error / Data is not updated');
                  }
          });
  }

  onFilterLogByDate(e: Date, FromTo){
    

    let from = new Date(e[0]);
    let to = new Date(e[1]);

    this.Logs = [];
    this.TempLogs.forEach(log =>{
      let logdate = new Date(log.ActionTime);
        
        if(logdate > from && logdate < to){
          
          this.Logs.push(log);
        }
    });
  }

}
