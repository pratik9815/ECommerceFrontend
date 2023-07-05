import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-random-product-list',
  templateUrl: './random-product-list.component.html',
  styleUrls: ['./random-product-list.component.css']
})
export class RandomProductListComponent implements OnInit {
  randomProducts: any;
  public imageUrl = environment.imageUrl;
  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getRandomProduct();
  }

  getRandomProduct()
  {
    this._productService.getLimitedProduct().subscribe({
      next: res => {
        this.randomProducts = res;
      }
    })
  }

}
