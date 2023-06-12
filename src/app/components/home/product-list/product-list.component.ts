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
  getProducts(count:any)
  {
    this._productService.getProductWithPagination(count).subscribe({
      next: (res:any) =>{
        this.product = res.product;
        this.totalPages = res.totalPage;
      }
    });
  }

}
