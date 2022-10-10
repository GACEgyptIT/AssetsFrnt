import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutes } from './users-routing';
import { RoleComponent } from './role/role.component';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AlertModule } from 'ngx-alerts';
import { ModalModule } from 'ngx-bootstrap';
import { PrivilegeComponent } from './privilege/privilege.component';
import { LoginComponent } from './login/login.component';
import { LockComponent } from './lock/lock.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { UseractionlogComponent } from '../users/useractionlog/useractionlog.component';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [ RoleComponent, PrivilegeComponent, LoginComponent, LockComponent, RegisterComponent, UserComponent, UnauthorisedComponent, UseractionlogComponent],
  imports: [
    SelectDropDownModule,
    NgxPrintModule,
    NgxAutocompleteModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    ModalModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 

  ]
})
export class UsersModule { }
