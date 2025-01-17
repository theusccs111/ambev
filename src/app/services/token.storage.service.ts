import { Injectable } from '@angular/core';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth';
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const COMPANY_CODE = 'company-code';
const COMPANY_CODES = 'company-codes';
const COMPETENCE = 'competence';
const BUDGET_ID = 'budget-id';
const TOOGLE_COLABORATOR = 'toogle-colaborator';
const TOOGLE_VALUES = 'toogle-values';
export const SCREEN_SAVER = 'screen-saver';

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

  public async saveUser(user: any): Promise<any> {
    user.authenticated = true;

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

    this.setToken(user.access_token)
    this.setRefreshToken(user.refresh_token)
  }

  setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  setRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user)
      return JSON.parse(user);
  }

  public getAdministrator(): any {
    const user = this.getUser();

    return user.profiles_by_company.some((company: any) =>
      company.profiles.some((profile: any) => profile.name === 'Administrador')
    );
  }

  public getProfile(): any {
    const user = this.getUser();

    for (const company of user.profiles_by_company) {
      if (company.profiles && company.profiles.length > 0) {
        return company.profiles[0];
      }
    }
  }
  public isAdmin(): boolean {
    const user = this.getUser();
    return user?.is_admin === true;
  }

  // Método para verificar se o usuário tem o perfil 'Suporte'
  public isSupport(): boolean {
    const user = this.getUser();
    return user?.is_support === true;
  }


  public isGestor(): boolean {
    const user = this.getUser();
    const isAdmin = user?.is_admin === true;
    const isSupport = user?.is_support === true;
    return !isAdmin && !isSupport;
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
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


  setCompanyCodes(token: string) {
    this.clearCompanyCode();
    window.sessionStorage.setItem(COMPANY_CODES, token);
  }

  getCompanyCodes(): any {
    return sessionStorage.getItem(COMPANY_CODES);
  }

  clearCompanyCodes() {
    window.sessionStorage.removeItem(COMPANY_CODES);
  }

  setCompanyCode(token: string) {
    this.clearCompanyCode();
    window.sessionStorage.setItem(COMPANY_CODE, token);
  }

  getCompanyCode(): any {
    return sessionStorage.getItem(COMPANY_CODE);
  }

  // getCompanyCode(): string | null {
  //   const companyCodes = localStorage.getItem('company_codes');
  //   if (companyCodes) {
  //     try {
  //       const parsedCodes = JSON.parse(companyCodes);
  //       return parsedCodes.length > 0 ? parsedCodes[0] : null; // Retorna o primeiro código
  //     } catch (error) {
  //       console.error("Error parsing company_codes:", error);
  //       return null;
  //     }
  //   }
  //   return null;
  // }


  getCompanyCodeOfListCompany(): string | null {
    const codes = this.getCompanyCodes();
    if (codes) {
      const companyList = codes[0];
      return companyList[0];
    }
    return null;
  }

  clearCompanyCode() {
    window.sessionStorage.removeItem(COMPANY_CODE);
  }

  setCompetence(token: string) {
    this.clearCompetence();
    window.sessionStorage.setItem(COMPETENCE, token);
  }

  getCompetence(): any {
    return sessionStorage.getItem(COMPETENCE);
  }

  clearCompetence() {
    window.sessionStorage.removeItem(COMPETENCE);
  }

  setBudget(token: string) {
    this.clearBudget();
    window.sessionStorage.setItem(BUDGET_ID, token);
  }

  getBudget(): any {
    return sessionStorage.getItem(BUDGET_ID);
  }

  clearBudget() {
    window.sessionStorage.removeItem(BUDGET_ID);
  }

  setToogleColaborator(token: string) {
    this.clearToogleColaborator();
    window.sessionStorage.setItem(TOOGLE_COLABORATOR, token);
  }

  getToogleColaborator(): any {
    let toogle_colaborator = sessionStorage.getItem(TOOGLE_COLABORATOR);
    if (toogle_colaborator) {
      return toBoolean(toogle_colaborator);
    } else {
      return false
    }

  }

  clearToogleColaborator() {
    window.sessionStorage.removeItem(TOOGLE_COLABORATOR);
  }

  setToogleValues(token: string) {
    this.clearToogleValues();
    window.sessionStorage.setItem(TOOGLE_VALUES, token);
  }

  getToogleValues(): any {
    let toogle_values = sessionStorage.getItem(TOOGLE_VALUES);
    if (toogle_values) {
      return toBoolean(toogle_values);
    } else {
      return false
    }

  }

  clearToogleValues() {
    window.sessionStorage.removeItem(TOOGLE_VALUES);
  }


}
