import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { LoginComponent } from './login/login.component';
import { LockComponent } from './lock/lock.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { AuthGuard } from 'app/shared/authentication/service/auth.guard';
import { UseractionlogComponent } from './useractionlog/useractionlog.component';

const routes: Routes = [];

export const UsersRoutes: Routes = [{
  path: '',
  children: [
      {
        path: 'roles',
     //   canActivate: [AuthGuard],  
          component: RoleComponent
      },
      {
        path: 'privilege',
    //    canActivate: [AuthGuard],  
        component: PrivilegeComponent
      },
      {
        path: 'user',
    //    canActivate: [AuthGuard],  
        component: UserComponent
      },
            
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'lock',
        // canActivate: [AuthGuard],  
        component: LockComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'unauthorised',
        component: UnauthorisedComponent
      },{
        path: 'useractionlog',
        component: UseractionlogComponent
      }
  ]
}];
