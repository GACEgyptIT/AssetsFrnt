
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent {

  data = {
    emails: [
      {
        individualEmailsTitle: "example Email Title",
        individualEmailsAddress: [
          {
            indvAddress: "example Email Address",
          }
        ]
      }
      // ,{
      //   genaricEmailsTitle: "example Email Title Gen",
      //   genaricEmailsAddress: [
      //     {
      //       genAddress: "example Email Address Gen",
      //     }
      //   ]
      // }
    ]
  }

  myForm: FormGroup;

  // get getMyForm() {
  //   return this.myForm.controls;
  // }
  // get getMyEmails() {
  //   return this.getMyForm.emails as FormArray;
  // }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      emails: this.fb.array([])
    })

    this.setEmails();
  }

  addNewEmail() {
     
    let control = <FormArray>this.myForm.controls.emails;
    control.push(
      this.fb.group({
        individualEmailsTitle: [''],
        individualEmailsAddress: this.fb.array([])
      })
    )
  }

  deleteEmail(index) {
    let control = <FormArray>this.myForm.controls.emails;
    control.removeAt(index)
  }

  addNewIndvAddress(control) {
    control.push(
      this.fb.group({
        projectName: ['']
      }))
  }

  deleteIndvAddress(control, index) {
    control.removeAt(index)
  }


  setEmails() {
    
    let control = <FormArray>this.myForm.controls.emails;
    this.data.emails.forEach(x => {
      
      control.push(this.fb.group({ 
        individualEmailsTitle: x.individualEmailsTitle, 
        individualEmailsAddress: this.setIndvAddress(x) }))
    })
  }

  setIndvAddress(x) {
    
    let arr = new FormArray([])
    x.individualEmailsAddress.forEach(y => {
      arr.push(this.fb.group({ 
        indvAddress: y.indvAddress 
      }))
    })
    return arr;
  }
}
