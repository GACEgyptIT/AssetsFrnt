import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-alertscomp',
  templateUrl: './alertscomp.component.html',
  styleUrls: ['./alertscomp.component.css']
})
export class AlertscompComponent {

  constructor(private alertService: AlertService) {}
    
  showAlerts(): void{
      // For normal messages
      this.alertService.info('this is an info alert');
      this.alertService.danger('this is a danger alert');
      this.alertService.success('this is a success alert');
      this.alertService.warning('this is a warning alert');
      
      // For html messages:
      this.alertService.warning({html: '<b>This message is bold</b>'});
  }  
}
