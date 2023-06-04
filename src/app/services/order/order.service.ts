import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl: string = "https://localhost:7069/api/Order/";

  constructor(private _httpClient:HttpClient) { }

  createOrder(orderBody:any)
  {
    return this._httpClient.post(this.apiUrl + 'create-orders',orderBody);
  }
  getOrder(id:any)
  {
    return this._httpClient.get(this.apiUrl+ 'get-by-id?customerId=' + id);
  }
  getOrderDetails(customerId:any)
  {
    return this._httpClient.get("https://localhost:7069/api/OrderDetails/get-order-details?customerId=" + customerId)
  }
}
