import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl : string = 'https://localhost:7069/api/Category/'
  constructor(private _httpClient:HttpClient) { }

  getCategory()
  {
    return this._httpClient.get(this.apiUrl + 'get-category');
  }
  getProductWithCategory(categoryId:any)
  {
    return this._httpClient.get("https://localhost:7069/api/Product/get-product-category?categoryId="+categoryId)
  }

}
