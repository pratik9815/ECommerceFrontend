import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl:string = "https://localhost:7069/api/User/get-customer-user-by-id/";
  // customerId:string ;
  constructor(private _httpClient:HttpClient, private _authService:AuthService) {
    // this.customerId = this._authService.user.customerId!; 
   }
  

  getCustomerById(customerId:string)
  {
    return this._httpClient.get(this.apiUrl+customerId)
  }
}
