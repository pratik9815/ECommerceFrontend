import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-popular-product-list',
  templateUrl: './popular-product-list.component.html',
  styleUrls: ['./popular-product-list.component.css']
})
export class PopularProductListComponent implements OnInit {
  popularProduct: any;

  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getPopularProduct();
  }
  getPopularProduct()
  {
    this._productService.getPopularProduct().subscribe({
      next: res => {
        this.popularProduct = res;
        console.log(this.popularProduct); 
      }
    })
  }
}
