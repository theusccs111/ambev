import { Injectable } from '@angular/core';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  companyProfile = new Subject();
  private empresa = new BehaviorSubject<any>([]);
  selectedEmpresa = this.empresa.asObservable();

  constructor() { }

  public getItem(value: string): string | null {
    return window.sessionStorage.getItem(value);
  }

  public setItem(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user)
      return JSON.parse(user);
  }

  public async setUser(user: any): Promise<any> {
    user.authenticated = true;

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.setToken(user.access_token)
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  
  loggedIn() {
    const user = this.getUser();
    if (user && user.authenticated) {
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    window.sessionStorage.clear();
  }


}
