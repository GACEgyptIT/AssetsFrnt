import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {

  currentUser =  new BehaviorSubject<any>('');
  
  constructor() { }

  getCurrentUser(){
    return this.currentUser.asObservable();
  }
  setCurrentUser(newuserdata){
        this.currentUser.next(newuserdata);
  }

}
