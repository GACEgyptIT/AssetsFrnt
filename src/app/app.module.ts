import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { PagesnavbarModule} from './shared/pagesnavbar/pagesnavbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { BsModalRef, BsModalService, ModalModule, AlertModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { WebStorageModule } from 'ngx-store';
import { HomeComponent } from './home/home.component';
import { SweetAlertComponent } from './components/sweetalert/sweetalert.component';
import { ImageCropperComponent } from 'ngx-img-cropper';

// import { DatafilterPipe } from './shared/pipes/datafilter.pipe';

@NgModule({
    imports: [
        WebStorageModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        HttpModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        PagesnavbarModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.wanderingCubes,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff', 
            secondaryColour: '#ffffff', 
            tertiaryColour: '#ffffff'
        }),
        ModalModule.forRoot(),
        AlertModule.forRoot()

    ],
    declarations: [
        ImageCropperComponent,
        SweetAlertComponent,
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        HomeComponent

    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
