import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertService } from 'ngx-alerts';

import { PositionModel } from 'app/shared/models/PositionModel';
import { PositionService } from './service/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {


  public loading = false;
  notificationMessage = '';

  positionForm = new FormGroup({
      posId: new FormControl(null),
      posTitle:  new FormControl('')
  });

  public Positions: PositionModel[] = [];

    constructor(
        private posSrv: PositionService,
        private fb: FormBuilder,
        private alertService: AlertService
      ) {
        this.onGetAllPositions();
  
    }
    ngOnInit() {
      this.positionForm = this.fb.group({
        posId: null,
        posTitle: [null, Validators.required]
      });
    }
    
    onGetAllPositions() {
            this.loading = true;
            this.posSrv.getAllpositions().subscribe((brns: PositionModel[]) => {
                    this.Positions = brns;
                    this.loading = false;
              }, error => {
                    console.log('error ...' ,  error.message);
                    this.loading = false;
                    if(error.message.includes('Http failure response for http://')) {
                      this.alertService.danger('Server error ');
                    }
            });
    }
    onSubmit(): void {
      debugger;
        if (!this.positionForm.value.posId) {
                this.loading = true;
                this.posSrv.addposition(this.positionForm.value).subscribe((pos:PositionModel) => {
                      this.positionForm.reset();
                      this.loading = false;
                      this.alertService.success('Position: ' +  pos.posTitle + ' Created Successfully ');
                      this.onGetAllPositions();
                }, error => {
                  console.log('Data is not Imported ...' ,  error.message);
                  this.loading = false;
                  if(error.message.includes('Http failure response for http://')) {
                    this.alertService.danger('server error');
                  }
                });
        } else if (this.positionForm.value.posId) {
                this.posSrv.editposition(this.positionForm.value.posId, this.positionForm.value).subscribe((pos: PositionModel) => {
                      this.positionForm.reset();
                      this.onGetAllPositions();
                      this.alertService.success('Position: ' +  pos.posTitle + ' Changed Successfully ');
                }, error => {
                      console.log('Data is not Imported ...' ,  error.message);
                      this.loading = false;
                      if(error.message.includes('Http failure response for http://')) {
                        this.alertService.danger('Server error');
                      }
                });
        }
    }
    onEditPosition(pos) {
        this.positionForm.reset();
        this.positionForm.patchValue(pos);
    }
    onDeletePosition(pos : PositionModel) {
        if(confirm("Are you sure to delete Position " + pos.posTitle)){
          this.posSrv.deleteposition(pos.posId).subscribe((posdlt: PositionModel) => {
            this.alertService.success('Position: ' +  pos.posTitle + ' deleted Successfully ');
            this.onGetAllPositions();
          }, error => {
            this.loading = false;
            if(error.message.includes('Http failure response for http://')) {
              this.alertService.danger('Server error');
            }
          });
        }
    }
    onCancel() {
       this.positionForm.reset();
 
    }
    
    get getPositionForm() { return this.positionForm.controls; }


}
