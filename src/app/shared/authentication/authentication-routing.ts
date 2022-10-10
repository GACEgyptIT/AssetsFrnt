import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [];

export const AuthenticationRoutes: Routes = [{
  path: '',
  children: [ ]
}];
