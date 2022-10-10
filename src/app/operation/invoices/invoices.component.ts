import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoiceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.invoiceForm = this.fb.group({
      invId: 0,
      supplyerName: null,
      invoice: null
    });

   }

  ngOnInit(): void {
  }

}
