import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardComponent } from 'app/forms/wizard/wizard.component';


const routes: Routes = [];

export const WizardRoutes: Routes = [{
  path: '',
  children: [
      {
          path: '',
          component: WizardComponent
      }

  ]
}
];
