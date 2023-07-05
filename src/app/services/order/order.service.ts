import { HttpClient, HttpParams } from '@angular/common/http';
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
  getOrder(id:any,page:any, orderStatus:any)
  {
    let queryParams = {
      "customerId": id,
      "page": page,
      "orderStatus": orderStatus
    };
    // let queryParams = new HttpParams({fromObject: parameters})
    return this._httpClient.get(this.apiUrl+ 'get-by-id' , {params:queryParams})
  }
  getOrderDetails(customerId:any)
  {
    const body = {

    }
    return this._httpClient.get(this.apiUrl + "get-order-details?customerId=" + customerId)
  }
  removeOrder(id:any)
  {
    return this._httpClient.post(this.apiUrl + "remove-order?orderId="+ id,null )
  }
}
