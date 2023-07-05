import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  productData:any;
  product : any;
  count: number = 1;
  totalPages:any ;
  data: Subscription;
  public imageUrl = environment.imageUrl;

  
  constructor(private _productService:ProductService) { }
  ngOnDestroy(): void {
    this.data.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts(this.count);
  }
  getProducts(count:any)
  {
    this.data = this._productService.getProductWithPagination(count).subscribe({
      next: (res:any) =>{
        this.product = res.product;
        this.totalPages = res.totalPage;
      }
    });
  }

}
