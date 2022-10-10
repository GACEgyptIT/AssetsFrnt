import { Component, OnInit } from '@angular/core';
//import { UserModel } from 'app/shared/models/UserModel';
import { EmployeeModel } from 'app/shared/models/EmployeeModel';
import { RegisterService } from './service/register.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    test : Date = new Date();

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    constructor(
        private route: ActivatedRoute,
        private regSrv: RegisterService,
        private fb: FormBuilder,
        private alertService: AlertService

    ) {
            this.registerForm = this.fb.group({
                usrId: null,
                EmpImg: null,
                usrFullName: [null, Validators.required],
                usrAccountName: [null, Validators.required],
                usrGender: [null, Validators.required],
                usrBirhtday: [null, Validators.required],
                usrPassword: [null, [Validators.required]],
                confirmUsrPassword: [null, [Validators.required]],
                usrEmail: [ null , [ Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            });

    }

    ngOnInit(){
        this.route.queryParams.subscribe(params => {
            if(params != {}){
                debugger;
              this.registerForm.patchValue(params);
            }
          });
        this.checkFullPageBackgroundImage();
        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    onSubmit() {
        this.regSrv.editUser(555, this.registerForm.value).subscribe(usr => {
            console.log(usr);
        })
    }
    onChangeChangeProfileImg(event) {
        let me = this;
        let file = event.target.files[0];
        let reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = () => {
         console.log( 'reader.result' ,reader.result);
        // this.imageCropData = reader.result;
          //console.log( 'MY Photo'  ,  reader.result);
          this.registerForm.get('EmpImg').setValue(reader.result);
          //console.log('  this.employeeForm.value  ', this.employeeForm.value);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }
    onCancel() {
        this.registerForm.reset();
    }

    get getRegisterForm() { return this.registerForm.controls; }
    get getEmpImg() {
        return this.registerForm.get('EmpImg') as FormControl;
    }
    get getUserId() {
        return this.registerForm.get('usrId') as FormControl;
    }
}
