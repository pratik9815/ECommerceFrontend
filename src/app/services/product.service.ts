import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'https://localhost:7069/api/Product/';

  constructor(private _httpClient:HttpClient) { }

  getProducts()
  {
    return this._httpClient.get(this.apiUrl+"get-images-with-all-images");
  }
  getProductById(id:any)
  {
    return this._httpClient.get(this.apiUrl+"getbyid/"+id);
  }


  getProductWithPagination(count:any)
  {
    return this._httpClient.get(this.apiUrl+"get-product-with-pagination/"+count)
  }
  getLimitedProduct()
  {
    return this._httpClient.get(this.apiUrl + 'get-random-product');
  }
  getPopularProduct()
  {
    return this._httpClient.get(this.apiUrl+'get-popular-product');
  }
}
