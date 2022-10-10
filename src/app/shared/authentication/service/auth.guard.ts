import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSrv: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // debugger;
      this.authSrv.url = state.url;
      if(this.authSrv.IsUserAccountStored()) {
            if(this.authSrv.IsAuthorised()){
              return true;
            } else {
              this.authSrv.goUnAuthorisedPage();
            }
      } else {
            this.authSrv.goLoginPage();
      }

  }
}
