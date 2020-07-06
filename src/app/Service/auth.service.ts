import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../_models/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  successfulLogin(token) {
    localStorage.setItem('token', token);
    this.loginSubject.next(true);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.loginSubject.next(false);
  }
}
