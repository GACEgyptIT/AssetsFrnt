import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';

import {  DomainModel } from 'app/shared/models/DomainModel';
import { DomainService } from './services/domain.service';
// import { DomainService } from './services/genaricemail.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

 

  public loading = false;
  notificationMessage = '';

  domainForm = new FormGroup({
      domId: new FormControl(0),
      genEmailAddress:  new FormControl('')
  });

  public Domains: DomainModel[] = [];

    constructor(
        private domSrv: DomainService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllDomains();
  
    }
    ngOnInit() {
      this.domainForm = this.fb.group({
        domId: 0,
        domName: [null, Validators.required]
      });
    }
    
    onGetAllDomains() {
      //    
            this.loading = true;
            this.domSrv.getAllDomains().subscribe((brns: DomainModel[]) => {
                    this.Domains = brns;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(status): void {
        
        if (this.domainForm.value.domId == 0) {
         
          this.loading = true;
                this.domSrv.addDomain(this.domainForm.value).subscribe(DomainAdded => {
                      this.domainForm.reset();
                      this.domainForm.controls['domId'].setValue(0);
                      this.loading = false;
                      this.onGetAllDomains();
                      this.alertService.success('Created Successfully ');
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error ');
                  }
                });

        } else if (this.domainForm.value.domId > 0) {
                 
                this.domSrv.editDomain(this.domainForm.value.domId, this.domainForm.value).subscribe(DomainAdded => {
                      this.domainForm.reset();
                      this.domainForm.controls['domId'].setValue(0);
                      this.onGetAllDomains();
                      this.alertService.success('Saved Successfully ');
                }, error => {
                      console.log('Data is not Imported ...' ,  error.message);
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error ');
                      }
                });
         
        }
    }
    onEditDomain(dom) {
        this.domainForm.reset();
        this.domainForm.patchValue(dom);
    }
    onDeleteDomain(dom : DomainModel) {
        if(confirm("Are you sure to delete Domain " + dom.domName)){
          
          this.domSrv.deleteDomain(dom.domId).subscribe((domdlt: DomainModel) => {

            this.alertService.success('Deleted Successfully ');
            this.onGetAllDomains();

          }, error => {
            console.log('Data is not Imported ...' ,  error.message);
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error ');
            }
          });
        }
    }
    onCancel() {
       this.domainForm.reset();
 
    }
    
    get getDomainForm() { return this.domainForm.controls; }


}
