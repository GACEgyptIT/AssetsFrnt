import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './shared/authentication/service/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';

export const AppRoutes: Routes = [{
    path: 'home',
    // redirectTo: 'home',
    component: HomeComponent,

},{
    path: '',
    redirectTo: 'dashboard', //'users/login',  // 'home'
    pathMatch: 'full',
},{
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'shared/authentication',
            loadChildren: './shared/authentication/authentication.module#AuthenticationModule'
        }]
    },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: 'wizard',
            loadChildren: './wizard/wizard.module#WizardModule'
        },{
            path: 'purchasing',
            loadChildren: './purchasing/purchasing.module#PurchasingModule'
        },{
            path: 'masterdata',
            loadChildren: './masterdata/masterdata.module#MasterdataModule'
        },{
            path: 'operation',
            loadChildren: './operation/operation.module#OperationModule'
        },{
            path: 'users',
            loadChildren: './users/users.module#UsersModule'
        },{
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        },{
            path: 'forms',
            loadChildren: './forms/forms.module#Forms'
        }
        // ,{
        //     path: 'tables',
        //     loadChildren: './tables/tables.module#TablesModule'
        // },{
        //     path: 'maps',
        //     loadChildren: './maps/maps.module#MapsModule'
        // },{
        //     path: 'charts',
        //     loadChildren: './charts/charts.module#ChartsModule'
        // },{
        //     path: 'calendar',
        //     loadChildren: './calendar/calendar.module#CalendarModule'
        // },{
        //     path: '',
        //     loadChildren: './userpage/user.module#UserModule'
        // }
    ]
        }
        // ,{
        //     path: '',
        //     component: AuthLayoutComponent,
        //     children: [{
        //         path: 'pages',
        //         loadChildren: './pages/pages.module#PagesModule'
        //     }]
        // }
];
