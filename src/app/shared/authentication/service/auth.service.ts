import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';
import { state } from '@angular/animations';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import Sha3 from '../../JS/sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//storage Variables
name = 'Angular 6';
// it will be stored under ${prefix}viewCounts name
@LocalStorage() viewCounts: number = 0;
// this under name: ${prefix}differentLocalStorageKey
@LocalStorage('differentLocalStorageKey') userName: string = '';
// it will be stored under ${prefix}itWillBeRemovedAfterBrowserClose in session storage
@SessionStorage({key: 'itWillBeRemovedAfterBrowserClose'}) previousUserNames: Array<string> = [];
// it will be read from cookie 'user_id' (can be shared with backend) and saved to localStorage and cookies after change
@LocalStorage() @CookieStorage({prefix: '', key: 'user_id'}) userId: string = '';
// it will be stored in a cookie named ${prefix}user_workspaces for 24 hours
@CookieStorage({key: 'user_workspaces', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}) userWorkspaces = [];

//////////////////
  // isAuthorized: boolean = false;
  isloginfailed: boolean = false;
  isUserNameExist: boolean = false;
  isAuthorized: boolean = false;
  url = '';
  options = <object>{};
  constructor(
    private http: HttpClient,
    private router: Router,
    private strSrv: AppstorageService,
    private shrdSrv: ShareddataService
    ) {
      //Storage
      this.viewCounts++;
      this.userName = 'some name stored in localstorage';
      this.previousUserNames.push(this.userName);
      for (let userName of this.previousUserNames) {
        console.log(userName);
      }
      this.previousUserNames.map(userName => userName.split('').reverse().join(''));
   }
 
  getLoginAcount(UserName: string, Password: string, isWinUsr: boolean) {
   // debugger;
    let psw = this.passwordEncrypt(Password);
    return this.http.get(environment.apiURL + 'Users/GetUserLogin/' + UserName + '/' + psw + '/' + isWinUsr);
  }
  passwordEncrypt(Password){
    return Sha3.keccak1600(1088, 512, Password, this.options); 
  }

  loginAD(UserName: string, Password: string, isWinUsr: boolean): Observable<any> {
        // 
        let loginUser = { username: UserName, password: Password  }
        return this.http.post('http://api.adauth.local:1035/api/auth/login', loginUser).pipe( retry(1), catchError(this.handleError) );
  }
  handleError(error) {
   // 
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    // this.isUserNameExist = true;
    // this.isAuthorized = false;
    // this.isloginfailed = true;
    return throwError(errorMessage);
  }
  goLoginPage() {
  //  
    this.router.navigate(['/users/login']);
  }
  goURLPage() {
    // 
    this.router.navigate([this.url]).then(() => {    window.location.reload(); });
  }
  goUnAuthorisedPage() {
    // 
    this.router.navigate(['/users/unauthorised']);
  }
  Isloginfailed() {
  //  
    return this.isloginfailed;
  }
  IsUserNameExist() {
  //  
    return this.isUserNameExist;
  }
  IsUserAccountStored() {
      //  
       var user = this.strSrv.getUserFromStorage();
       if(user != null) {   this.shrdSrv.setCurrentUser(user); return true; }
       else if(user == null) {return false; }
  }
  IsAuthorised() {
  // debugger;
      var user = this.strSrv.getUserFromStorage();
      if(user != null) { 
          this.isAuthorized = false;
          user.Privileges.forEach(privilege => {
           //  debugger;
              if(this.url.includes(privilege))
              {
                      this.isAuthorized = true;
                      if(this.isAuthorized) {
                        return this.isAuthorized;
                      }
              }
          });
        
      }
      else if(user == null) {
          this.isAuthorized = false;
      }
      return this.isAuthorized;
  }
  // IsADAuthorised(UserName: string, Password: string): Observable<any> {
  //   let user = { username: UserName, password: Password  }

  //   var user =  
  //   return this.http.post('http://api.adauth.local:1035/api/auth/login', user).pipe( retry(1), catchError(this.handleError) );
  // }

  //user : any = { username : '', password : '' }
  // isAuthenticated() {
  //   
  //   return this.isAuthorized; //this.authenticationStat.value;
  // }
  // //Storage
  // private saveMyData() {
  // this.strSrv.saveObjectToStorage({'my data': 'thingy'}, ['data1','data2']);
  // }
  //loggedUser = {"UserName": '', "ImgUrl": '', "UserSecGroup": '' };
  // StoreUserinLocalStorage(usr) {

  //   // let localUser = 'localUser';
  //   // this.lclStrg.localStorage.setItem(localUser, JSON.stringify(this.loggedUser));
  //   // let item = JSON.parse(localStorage.getItem(localUser));
  //   // console.log(item);

  //  // 
  //   return usr;
  // }
}
