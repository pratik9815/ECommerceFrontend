import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-category-product',
  templateUrl: './sub-category-product.component.html',
  styleUrls: ['./sub-category-product.component.css']
})
export class SubCategoryProductComponent implements OnInit {
  subCategoryId:any
  productList:any;
  totalPages:number = 0;
  count:number = 1;
  public imageUrl = environment.imageUrl;
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductService) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        this.subCategoryId = res.value;
        this.getProductWithSubCategory(this.count);
      }
    });
  }
  getProductWithSubCategory(count:any) {
    if (this.subCategoryId) {
      this._productService.getProductWithSubCategory(this.subCategoryId,count).subscribe({
        next: (res:any) => {
          // console.log(res);
          console.log(res.product)
          this.productList = res.product;
          this.totalPages = res.totalPage;
        }
      });
    }
  }

}
