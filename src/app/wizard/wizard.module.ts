import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WizardRoutes } from './wizard-routing';
import { WizardComponent } from './wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { LbdModule } from '../lbd/lbd.module';


@NgModule({
  declarations: [WizardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
        TagInputModule,
        // NouisliderModule,
        JwBootstrapSwitchNg2Module,
        LbdModule,
    RouterModule.forChild(WizardRoutes)
  ]
})
export class WizardModule { }
