import { Component, OnInit, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../authentication/service/auth.service';
import { AppstorageService } from '../services/appstorage.service';
import { NotificationModel } from '../models/NotificationModel';
import { NavbarService } from './service/navbar.service';
import { EmployeeModel } from '../models/EmployeeModel';

var misc:any ={
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    emp: EmployeeModel;
    notificationCount: number = 0;
    Notifications: NotificationModel[] = [];
    
    isLogin: boolean = false;

    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    @ViewChild("navbar-cmp") button;

    constructor(
        location:Location, 
        private element : ElementRef, 
        private authSrv: AuthService, 
        private router: Router,
        private strgSrv: AppstorageService,
        private navSrv: NavbarService
        ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;


    }

    ngOnInit(){
       // debugger;

     this.emp = this.strgSrv.getUserFromStorage();
     this.onGetNotifications();

        this.isLogin = this.authSrv.IsUserAccountStored();

        this.listTitles = ROUTES.filter(listTitle => listTitle);

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if($('body').hasClass('sidebar-mini')){
            misc.sidebar_mini_active = true;
        }
        $('#minimizeSidebar').click(function(){
            var $btn = $(this);

            if(misc.sidebar_mini_active == true){
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            }else{
                setTimeout(function(){
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                },300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function(){
                window.dispatchEvent(new Event('resize'));
            },180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function(){
                clearInterval(simulateWindowResize);
            },1000);
        });
    }

    onGetNotifications() {
       // debugger;
        let empId = 0;
        if(this.emp != null){
            empId = this.emp.empId;
            if(empId != null){
                this.navSrv.GetNotificationsByEmpId().subscribe((nots: NotificationModel[]) => {
                    this.Notifications = nots;
                    this.notificationCount = this.Notifications.length;
               //  //   debugger;
                  }, error => {
                    if(error.message.includes('Http failure response for http://')) {
                   //   this.alertService.danger('Server error ');
                    }
                });
            }
        }


    }
    onGoForNotification(n: NotificationModel){
        //    debugger;
            this.navSrv.UpdateNotificationsById(n.NotificationId).subscribe(r=>{
                this.onGetNotifications();
                this.router.navigate([n.Url]);
            }); 
    }

    isMobileMenu(){
        if($(window).width() < 991){
            return false;
        }
        return true;
    }

    sidebarOpen(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        },500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }
    sidebarClose(){
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle(){
        if(this.sidebarVisible == false){
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === "sub") {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    // console.log(subtitle)
                    // console.log(titlee)
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }

    getPath(){
        // console.log(this.location);
        return this.location.prepareExternalUrl(this.location.path());
    }


    onLogin() {
        this.authSrv.goLoginPage();
    }
    onLogout() {

        this.strgSrv.clearSomeDataFromStorage();
        this.router.navigate(['/dashboard']).then(() => { window.location.reload(); });
    }

    IsLogin() {
        this.isLogin = this.authSrv.IsUserAccountStored();
        return this.authSrv.IsUserAccountStored();
    }
    onLoc() {
        
    }
}
