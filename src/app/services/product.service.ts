import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'https://localhost:7069/api/Product/get-images-with-all-images';

  constructor(private _httpClient:HttpClient) { }

  getProducts()
  {
    return this._httpClient.get(this.apiUrl);
  }
  getProductById(id:any)
  {
    return this._httpClient.get("https://localhost:7069/api/Product/getbyid/"+id);
  }
}
