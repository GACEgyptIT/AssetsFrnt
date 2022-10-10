import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApproveRejectModel } from 'app/shared/models/ApprovalModel';
import { PurchasingRequestModel } from 'app/shared/models/PurchaseRequestmodel';
import { AlertService } from 'ngx-alerts';
import { PrService } from '../prrequest/service/pr.service';
import { ApprovalService } from './service/approval.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  public loading = false;
  public PRs: PurchasingRequestModel[] = [];
  prForm: FormGroup;

  constructor(       
     private apprSrv: ApprovalService,
     private alertService: AlertService,
     private fb: FormBuilder,
     ) { 
      this.prForm = this.fb.group({
        PurchaseRequestId: null,
        prRemarks: [null, Validators.required],
        Items:  this.fb.array([]),
        userId: null,
        HD: false,
        OM: false,
        IT: false,
        GM: false
      });
     }

  ngOnInit() {
    this.onGetAllPRs();
  }

  onGetAllPRs() {
    this.loading = true;
    this.apprSrv.getPRsForApprovalByEmpId().subscribe((res: PurchasingRequestModel[]) => {
            this.PRs = res;
        //    this.PRsTemp = res;
            this.loading = false;
            debugger;
      }, error => {

            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error ');
            }
    });
  }

  onApproveReject(prpo){
    debugger;
    const m = new ApproveRejectModel();
    if(prpo.PurchaseRequestId != null){
      m.ActionType = "Approve";
      m.PrId = prpo.PurchaseRequestId;
    } else if(prpo.PurchaseOrderId != null){
      m.ActionType = "Approve";
      m.PrId = prpo.PurchaseOrderId;
    }
    this.apprSrv.onApproveReject(m).subscribe(pr=>{
      debugger;
      this.onGetAllPRs();
    });
  }
  // onReject(prpo){
  //   debugger;
  //   if(prpo?.PurchaseRequestId != null){
  //     const m = new ApproveRejectModel();
  //     m.ActionType = "Reject";
  //     m.PrId = prpo.PurchaseRequestId;
  //   } else if(prpo?.PurchaseOrderId != null){
  //     const m = new ApproveRejectModel();
  //     m.ActionType = "Reject";
  //     m.PrId = prpo.PurchaseOrderId;
  //   }
  //   this.apprSrv.onApproveReject(prpo).subscribe(pr=>{
  //     debugger;
  //     this.onGetAllPRs();
  //   });
  // }

}
