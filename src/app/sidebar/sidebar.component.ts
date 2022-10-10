import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { UsersModule } from 'app/users/users.module';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { ShareddataService } from 'app/shared/services/shareddata.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    //     path: '/dashboard',
    //     title: 'Dashboard',
    //     type: 'link',
    //     icontype: 'pe-7s-graph'
    // },{
    //     path: '/wizard',
    //     title: 'Wizard',
    //     type: 'link',
    //     icontype: 'pe-7s-magic-wand'
    // },{
        path: '/operation',
        title: 'Operation',
        type: 'sub',
        icontype: 'pe-7s-plugin',
        children: [
            // {path: 'Invoicedashboard', title: 'Dashboard', ab: '*'},
            {path: 'invoicemng', title: 'Invoices General', ab: '*'},
           // {path: 'invoicelines', title: 'Invoices Operators', ab: '*'},
            {path: 'assetmng', title: 'Asset Transfer', ab: '*'},
          //  {path: 'emailmng', title: 'Mng Emails ', ab: '*'}
        ]
    },

    // {
    //     path: '/purchasing',
    //     title: 'Purchasing',
    //     type: 'sub',
    //     icontype: 'pe-7s-plugin',
    //     children: [
    //         {path: 'prrequest', title: 'Purchase Request', ab: '*'},
    //         {path: 'poorder', title: 'Purchase Order', ab: '*'},
    //         {path: 'receiving', title: 'Receiving', ab: '*'},
    //         {path: 'transfer', title: 'Transfer', ab: '*'},
    //         {path: 'item', title: 'Items', ab: '*'},
    //         {path: 'store', title: 'Stores', ab: '*'},
    //         {path: 'soh', title: 'StockOnHand', ab: '*'},
    //         {path: 'consumption', title: 'Consumption', ab: '*'},
    //         {path: 'approval', title: 'Approvals', ab: '*'},
    //     ]
    // },

    {
        path: '/masterdata',
        title: 'MasterData',
        type: 'sub',
        icontype: 'pe-7s-plugin',
        children: [
            {path: 'employee', title: 'Employees', ab: '*'},
            {path: 'assets', title: 'Assets', ab: '*'},
            {path: 'assetbrand', title: 'Asset Brand', ab: '*'}, 
            {path: 'assettype', title: 'Asset Type', ab: '*'}, 
            {path: 'assetcategory', title: 'Asset Category', ab: '*'}, 
            {path: 'empdirectory', title: 'Emp Directory', ab: '*'},
            {path: 'department', title: 'Departments', ab: '*'},
            {path: 'branch', title: 'Branch', ab: '*'},
            {path: 'company', title: 'Company', ab: '*'},
            {path: 'position', title: 'Position', ab: '*'},
            {path: 'genaricemail', title: 'Genaric Email', ab: '*'},
            {path: 'domain', title: 'Domain', ab: '*'},
            {path: 'supplier', title: 'Supplier', ab: '*'},
            {path: 'operator', title: 'Operator', ab: '*'},
            {path: 'opraccnumber', title: 'Operator Acc Number', ab: '*'},
            {path: 'operatorrateplan', title: 'Operator Rate Plan', ab: '*'},
            {path: 'CostCenter', title: 'Cost Center', ab: '*'},
            {path: 'itemscategory', title: 'Items Category', ab: '*'},
        ]
    },
    {
        path: '/users',
        title: 'UsersMng',
        type: 'sub',
        icontype: 'pe-7s-plugin',
        children: [
            {path: 'user', title: 'Users List', ab: '*'},
            {path: 'roles', title: 'Roles', ab: '*'},
            {path: 'privilege', title: 'Privileges', ab: '*'},
            // {path: 'login', title: 'Login', ab: '*'},
            {path: 'useractionlog', title: 'User Log', ab: '*'}  
        ]
    }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {

   defaultEmpImg =  "../../assets/files/profileImg/default-face.jpg";

    usr: EmployeeModel = {
        EmpImg: "../../assets/files/profileImg/default-face.jpg",
        empFullName: 'User Full Name',
        accountName: 'User Name',
       // userRole: 'Role'
    };

    onProfileEdit(){
        // let user = {EmpImg: this.usr.EmpImg, usrFullName: this.usr.usrFullName, usrAccountName:  this.usr.usrAccountName, userRole: this.usr.userRole,
        //     usrEmail: this.usr.usrEmail,  usrBirhtday: this.usr.usrBirhtday,  usrGender: this.usr.usrGender   }
        this.router.navigate(['/users/register'], { queryParams: this.usr });
    }

    showCurrentUser(){
      this.shareddataSrv.getCurrentUser().subscribe( res=>{
            this.usr = res;
      })
    }

    constructor(
        private router: Router,
        private strgSrv: AppstorageService,
        private shareddataSrv : ShareddataService
   ) {
       //  this.usr = this.strgSrv.getUserFromStorage();
   }

    public menuItems: any[];
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {

        this.showCurrentUser();

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows){
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }
    }
    ngAfterViewInit(){
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");

        this.usr = this.strgSrv.getUserFromStorage();
    }
}
