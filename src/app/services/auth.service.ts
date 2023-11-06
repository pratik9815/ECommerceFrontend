import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { UpdateUserCommand } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)

  isLoggedIn$ = this._isLoggedIn$.asObservable();


  apiUrl = 'https://localhost:7069/api/ApplicationUser/';

  private _customer: CustomerInfo = new CustomerInfo();

  user: CustomerInfo = new CustomerInfo();


  constructor(private _httpClient: HttpClient, private _toastrService: ToastrService) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
    this.user = this.getUser(this.GetToken())
  }

  GetToken(): any {
    return localStorage.getItem('token');
  }

  onLogin(authenticateRequest: any) {
    return this._httpClient.post(this.apiUrl + 'autheticate-user', authenticateRequest).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('token', res.token as string);
        this.user = this.getUser(this.GetToken())

      })
    );
  }
  onLogout() {
    return this._httpClient.post(this.apiUrl + 'logout', null).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(false);
      })
    );
  }

  onSignIn(body: any) {
    return this._httpClient.post(this.apiUrl + 'create-user', body, { responseType: 'text' });
  }

  private getUser(token: string): any {
    return token ? JSON.parse(atob(token.split('.')[1])) as CustomerInfo : undefined;
  }


  public decodeToken(): any {
    let rawToken = localStorage.getItem('token');
    if (rawToken != null)
      return jwt_decode(rawToken);
    else
      return null;
  }

  public showLoginPageIfTokenExpries(): void {

    const token = localStorage.getItem('token');
    if (token == null) {
      // const date = this.getTokenExpirationDate();
      // console.log(date);
    }

    else if (this.isTokenExpired()) {
      this.onLogout().subscribe({
        next: res => {
          localStorage.removeItem('token');
          this._toastrService.info('You session has expired. Please login again.', 'Info');
        }
      })
      localStorage.removeItem('token');
      this._isLoggedIn$.next(false); // push to subscribers of observable
      // this._toastrService.info('You session has expired. Please login again.', 'Info');
    }
    else
      this._isLoggedIn$.next(true);  // push to subscribers of observable
  }

  public isTokenExpired(): boolean {
    let rawToken = localStorage.getItem('token');
    if (rawToken == null) {
      return true;
    }

    const date = this.getTokenExpirationDate();
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }


  public getTokenExpirationDate(): Date {
    let rawToken = localStorage.getItem('token');
    const decoded: any = jwt_decode(rawToken as string);

    if (decoded.exp === undefined)
      return null as any;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    console.log(date)
    return date;
  }

  onUpdateUser(user:UpdateUserCommand)
  {
    return this._httpClient.put(this.apiUrl+'update-user',user);
  }

  onChangePassword(request:any)
  {
    return this._httpClient.post(this.apiUrl+ 'change-password',request)
  }

}



export class CustomerInfo {
  userName?: string | undefined;
  fullName?: string | undefined;
  address?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  id?: string | undefined;
  usertype?: string | undefined;
  customerId?: string | undefined;
}