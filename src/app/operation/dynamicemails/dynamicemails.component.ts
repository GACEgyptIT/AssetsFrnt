import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GenaricEmailModel } from 'app/shared/models/GenaricEmailModel';
import { GenaricemailService } from 'app/masterdata/genaricemail/service/genaricemail.service';

@Component({
  selector: 'app-dynamicemails',
  templateUrl: './dynamicemails.component.html',
  styleUrls: ['./dynamicemails.component.css']
})
export class DynamicemailsComponent implements OnInit {
  showEmailSection = false
  public Emails: GenaricEmailModel[] = [];
  employeeForm: FormGroup;
  dataContainer = {
    emailsINDIV: [{ emailAddress: "", }],
    emailsGEN: [{ genEmailId: 0, genEmailAddress: ""  }],
  }
  onGetAllGenaricEmails() {
    //    
          this.gmlSrv.getAllGenaricemails().subscribe((mls: GenaricEmailModel[]) => {
            // console.log('this.Emails....' , this.Emails);
     //       
            this.Emails = mls;
           // this.temp = mls;  // for search
            //  console.log('this.Emails....' , this.Emails);
            //  
           });
  }
  constructor(
    private fb: FormBuilder,
    private gmlSrv: GenaricemailService,
    ) {
    this.employeeForm = this.fb.group({
      emailsINDIV: this.fb.array([]),
      emailsGEN: this.fb.array([])
    })
    this.setEmails();
    console.log(this.employeeForm.value);
    
    this.onGetAllGenaricEmails();
  }

  ngOnInit(): void {
  }

  Submit() {
    
    console.log(this.employeeForm.value);
  }
  showEmailSectionFn() {
     
    this.showEmailSection = true
  }

  onAddIndividualEmail(control) {
     
    control.push(
      this.fb.group({
        emailAddress: ['']
      }))
  }
  onAddGenaricEmail(control) {
     
    control.push(
      this.fb.group({
        genEmailId: 0,
        genEmailAddress: ['']
      }))
  }
  deleteIndividualEmail(index) {
    let control = <FormArray>this.employeeForm.controls.emailsINDIV;
    control.removeAt(index)
  }
  deleteGenaricEmail(index) {
    let control = <FormArray>this.employeeForm.controls.emailsGEN;
    control.removeAt(index)
  }
  // deleteIndvAddress(control, index) {
  //   
  //   control.removeAt(index)
  // }
  setEmails() {
    
    let indivCtl = <FormArray>this.employeeForm.controls.emailsINDIV;
    let genCtl = <FormArray>this.employeeForm.controls.emailsGEN;
    this.dataContainer.emailsINDIV.forEach(x => {
      
      indivCtl.push(this.fb.group({
        emailAddress: x.emailAddress
      }));
    });
    this.dataContainer.emailsGEN.forEach(x => {
      
      genCtl.push(this.fb.group({
        genEmailId: x.genEmailId,
        genEmailAddress: x.genEmailAddress
      }));
    });
  }
  onSelectGenaricEmail(control, event) {

    this.getGenaricEmailsForm.controls['genEmailId'].setValue(event.genEmailId);
    this.getGenaricEmailsForm.controls['genEmailAddress'].setValue(event.genEmailAddress);
  
  }
  get getIndividualEmailsForm(){
    return this.employeeForm.get('emailsINDIV') as FormArray;
  }
  get getGenaricEmailsForm(){
    return this.employeeForm.get('emailsGEN') as FormArray;
  }
}
