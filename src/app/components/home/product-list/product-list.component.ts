import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productData:any;
  product : any;
  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct()
  {
    this._productService.getProducts().subscribe({
      next: res =>{
        this.product = res;
      }
      });
  }

}
