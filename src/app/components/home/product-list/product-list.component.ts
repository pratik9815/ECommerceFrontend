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
  count: number = 1;
  totalPages:any ;
  
  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts(this.count);
  }
  // getProduct()
  // {
  //   this._productService.getProducts().subscribe({
  //     next: res =>{
  //       this.product = res;
  //     }
  //     });
  // }
  getProducts(count:any)
  {
    this._productService.getProductWithPagination(count).subscribe({
      next: (res:any) =>{
        this.product = res.product;
        console.log(this.product);
        this.totalPages = res.totalPage;
      }
    });
  }

}
