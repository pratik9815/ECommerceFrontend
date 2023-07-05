import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-list',
  templateUrl: './popular-product-list.component.html',
  styleUrls: ['./popular-product-list.component.css']
})
export class PopularProductListComponent implements OnInit,OnDestroy {
  popularProduct: any;
  data: Subscription;
  public imageUrl = environment.imageUrl;

  constructor(private _productService:ProductService) { }
  ngOnDestroy(): void {
    this.data.unsubscribe();
  }

  ngOnInit(): void {
    this.getPopularProduct();
  }
  getPopularProduct()
  {
    this.data = this._productService.getPopularProduct().subscribe({
      next: res => {
        this.popularProduct = res;
      }
    })
  }
}
