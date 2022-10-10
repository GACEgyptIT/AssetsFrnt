import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';

import {  GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';
import { GenaricemailService } from './service/genaricemail.service';
import { FileService } from 'app/shared/services/downloadfile.service';
// import { GenaricemailService } from './services/genaricemail.service';

@Component({
  selector: 'app-genaricemail',
  templateUrl: './genaricemail.component.html',
  styleUrls: ['./genaricemail.component.css']
})
export class GenaricemailComponent implements OnInit {


  public loading = false;
  notificationMessage = '';
  @ViewChild("fileInput") fileInput;

  departmetForm = new FormGroup({
      genEmailId: new FormControl(0),
      genEmailAddress:  new FormControl('')
  });

  public Genaricemails: GenaricEmailModel[] = [];

    constructor(
        private fileService: FileService,
        private gmailSrv: GenaricemailService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllGenaricemails();
  
    }
    ngOnInit() {
      this.departmetForm = this.fb.group({
        genEmailId: null,
        genEmailAddress: [null, Validators.required]
      });
    }
    
    onGetAllGenaricemails() {
            this.loading = true;
            this.gmailSrv.getAllGenaricemails().subscribe((brns: GenaricEmailModel[]) => {
                    this.Genaricemails = brns;
                    this.loading = false;
              }, error => {
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error');
                    }
            });
    }
    onSubmit(): void {
        if (!this.departmetForm.value.genEmailId) {
          this.loading = true;
                this.gmailSrv.addGenaricemail(this.departmetForm.value).subscribe(GenaricemailAdded => {
                      this.departmetForm.reset();
                      this.loading = false;
                      this.alertService.success('Created Successfully');
                      this.onGetAllGenaricemails();
                }, error => {
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('Server error');
                  }
                });

        } else if (this.departmetForm.value.genEmailId) {
                this.gmailSrv.editGenaricemail(this.departmetForm.value.genEmailId, this.departmetForm.value).subscribe(GenaricemailAdded => {
                      this.departmetForm.reset();
                      this.onGetAllGenaricemails();
                      this.alertService.success('Changed Successfully');
                }, error => {
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error');
                      }
                });
        }
    }
    uploadFile() {
      debugger;
      this.Genaricemails = [];
      let formData = new FormData();
      this.loading = true;
      formData.append("upload", this.fileInput.nativeElement.files[0]);
  
          this.gmailSrv.UploadExcel(formData).subscribe(result => {
            
            this.onGetAllGenaricemails();
            // this.AddUserLog("Assets File ( " + this.fileInput.nativeElement.files[0].name +  " ) Uploaded" );
            // this.message = result.toString();
            // this.onUpdatestatistics();
            // this.loading = false;
             this.alertService.success('File Uploaded Successfully');
          });
    }
    download() {
      this.fileService.downloadFileGenericEmailSample().subscribe(response => {
        
        let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        window.open(response.url);
      }), error => console.log('Error downloading the file'),
                   () => console.info('File downloaded successfully');
    }
    onEditGenaricemail(emp) {
    //  
        this.departmetForm.reset();
        this.departmetForm.patchValue(emp);
      //  this.departmetForm.controls.GenaricemailTypes.get('emptypName').patchValue(emp.GenaricemailType.emptypName);

    }
    onDeleteGenaricemail(emp : GenaricEmailModel) {
        if(confirm("Are you sure to delete Genaricemail " + emp.genEmailAddress)){
          this.gmailSrv.deleteGenaricemail(emp.genEmailId).subscribe((empdlt: GenaricEmailModel) => {
            this.alertService.success('Genaricemail: ' +  empdlt.genEmailAddress + ' deleted successfully');
            this.onGetAllGenaricemails();
          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.departmetForm.reset();
 
    }

    get getGenaricemailForm() { return this.departmetForm.controls; }



}
