import { Injectable } from '@angular/core';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../models/EmployeeModel';
import { environment } from 'environments/environment';
import { AssetTrackingModel } from '../models/AssetTrackingModel';
import { ShareddataService } from './shareddata.service';
import { BehaviorSubject } from 'rxjs';
import { AssetModel } from '../models/AssetModel';
import { LogsService } from './logs.service';

@Injectable({
  providedIn: 'root'
})
export class AppstorageService {
  // currentUser =  new BehaviorSubject<any>('');
  
  usr;
  ipAddress = "LocalIP";

  constructor(
    private sharddataSrv: ShareddataService,
    private logSrv: LogsService,
    public localStorageService: LocalStorageService,
    public sessionStorageService: SessionStorageService,
    public cookiesStorageService: CookiesStorageService,
    public sharedStorageService: SharedStorageService,
    private http: HttpClient
  ) {
    console.log('all cookies:');
    cookiesStorageService.utility.forEach((value, key) => console.log(key + '=', value));
 //   
    // this.usr = this.getUserFromStorage();
    this.getIPAddress()
  }

  getIPAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
   //   
      this.ipAddress = res.ip;
    });
  }
  // body;


  public saveObjectToStorage(usr: EmployeeModel, array: Array<any>) {
   debugger;
    console.log(this.ipAddress);
    usr.IP_Address = this.ipAddress;
    this.clearSomeDataFromStorage();
    this.localStorageService.set('usrObject', usr);
    this.sessionStorageService.set('someArray', array);
    let user = this.localStorageService.get('usrObject');
    if(usr != null) {
      this.logSrv.sendUserLog("User Account: " + usr.accountName + " has Logged in Successfully ").subscribe(res=>{
      });
    }
    this.sharddataSrv.setCurrentUser(usr);
    return user;
  }
  public getUserFromStorage() {
   // 
    return this.localStorageService.get('usrObject');
  }
  public clearSomeDataFromStorage(): void {
    
    let usr = this.localStorageService.get('usrObject');
    if(usr != null) {
     
      this.logSrv.sendUserLog("User Account: " + usr.usrAccountName + "  has Logged out Successfully ").subscribe(res=>{
      });
    }
    this.localStorageService.clear('decorators'); // removes only variables created by decorating functions
    this.localStorageService.clear('prefix'); // removes variables starting with set prefix (including decorators)
    this.sessionStorageService.clear('all'); // removes all session storage data
    // console.log(this.getUserFromStorage());
    // 
  }


  // getCurrentUser(){
  //   return this.currentUser.asObservable();
  // }
  // setCurrentUser(newuserdata){
  //       this.currentUser.next(newuserdata);
  // }
}
