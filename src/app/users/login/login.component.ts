import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/authentication/service/auth.service';
import { AppstorageService } from 'app/shared/services/appstorage.service';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { LogsService } from 'app/shared/services/logs.service';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  test : Date = new Date();
  isAuthorized: boolean = false;
  isloginfailed: boolean = false;
  isUserNameExist: boolean = false;
  errorMsg = '';
  windowsUserName = '';

  loginForm = new FormGroup({
    UserName: new FormControl(''),
    Password:  new FormControl(''),
    appUserCheckbox: new FormControl('')
  });

  checkFullPageBackgroundImage(){
      var $page = $('.full-page');
      var image_src = $page.data('image');

      if(image_src !== undefined){
          var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
          $page.append(image_container);
      }
  };
  AddUserLog(action: string) {
    this.logSrv.sendUserLog(action).subscribe(res=>{
      console.log(res);
      
    });
  }
constructor(
  private strSrv: AppstorageService,
  private logSrv: LogsService,
  private authSrv: AuthService,
  // private strgSrv: AppstorageService,
  private fb: FormBuilder
){
  this.isloginfailed = this.authSrv.Isloginfailed();
  this.isUserNameExist = this.authSrv.IsUserNameExist();
}
  ngOnInit(){

    this.isloginfailed = this.authSrv.Isloginfailed();
    this.isUserNameExist = this.authSrv.IsUserNameExist();

    this.loginForm = this.fb.group({
      UserName: [null , Validators.required],
      Password: [null, Validators.required],
      WindowsUser: false
    });

      this.checkFullPageBackgroundImage();
      setTimeout(function(){
          // after 1000 ms we add the class animated to the login/register card
          $('.card').removeClass('card-hidden');
      }, 700)
  }


  onSubmit(e) {
              
              this.errorMsg = '';
              let isWinUsr = this.loginForm.get('WindowsUser').value;

              this.authSrv.getLoginAcount(e.UserName, e.Password, isWinUsr).subscribe((usr: EmployeeModel) => {
                              console.log(usr);
                              debugger;
                              if(!isWinUsr){
                                        
                                        this.authSrv.isloginfailed = false;
                                        this.strSrv.saveObjectToStorage(usr, []);
                                        
                                        if(this.authSrv.IsAuthorised()){
                                              
                                              this.authSrv.goURLPage();
                                        } else {
                                          
                                          this.authSrv.goUnAuthorisedPage();
                                        }
                                      this.authSrv.goURLPage();
                              } if(isWinUsr){
                                      this.authSrv.loginAD(e.UserName, e.Password, isWinUsr).subscribe(usrAD =>{
                                                    this.authSrv.isloginfailed = false;
                                                    
                                                    if(usrAD) {
                                                      this.strSrv.saveObjectToStorage(usr, []);
                                                      
                                                    } if(this.authSrv.IsAuthorised()){
                                                          
                                                          this.authSrv.goURLPage();
                                                    } else {
                                                          
                                                          this.authSrv.goUnAuthorisedPage();
                                                    }
                                            this.authSrv.goURLPage();
                                      }, error => {
                                                        
                                                        const Unauthorized = "401";
                                                        const NoConnection = "Unknown";
                                                        if(error.includes(NoConnection)) {
                                                          this.errorMsg = 'No Server Connection (AD-API)';
                                                        } else if (error.includes(Unauthorized)) {
                                                      
                                                          this.logSrv.sendUserLog("User Account: " + usr.accountName + " Loggin failed ").subscribe(res=>{
                                                            this.errorMsg = 'Windows User Name or Password Incorrect';
                                                          });
                                                        }
                                                  }
                                      );
                              }

              }, error => {
                                  
                                  console.log(error.statu);
                                //  this.errorMsg = error.message;
                                  // const NotFound = "404";
                                  // const Unauthorized = "401";
                                  // const NoConnection = "Unknown";
                                  if(error.message.includes("Unknown")) {
                                    this.logSrv.sendUserLog(" No Server Connection (Local DB) ").subscribe(res=>{
                                      this.errorMsg = 'No Server Connection (Local DB)';
                                    });
                                  } if (error.message.includes("404")) {
                              
                                    this.logSrv.sendUserLog(" Loggin failed ").subscribe(res=>{
                                      this.errorMsg = 'Local User Name or Password Incorrect';
                                    });
                                  }
                          }
              );
  }
  onChangeWindowsUserCheckbox(e) {
      //
      if(e.target.checked){
        this.loginForm.get('WindowsUser').setValue(true);
      } else {
        this.loginForm.get('WindowsUser').setValue(false);
      }
  }
  // getwindowsUserName() {
  //   let user = new ActiveXObject("WSCRIPT.Network");
  //   console.log(user.UserName.toLowerCase());
  //   this.windowsUserName = user;
  // }


}
