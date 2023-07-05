import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {
  productList: any;
  categoryId: any;
  totalPages: number = 0;
  count:number = 1;
  public imageUrl = environment.imageUrl;
  constructor(private _categoryService: CategoryService,
    private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe({
      next: (res: any) => {
        this.categoryId = res.value;
        this.getProductWithCategory(this.count);
      }
    });
  }
  
  getProductWithCategory(count:any) {
    if (this.categoryId) {
      this._categoryService.getProductWithCategory(this.categoryId,count).subscribe({
        next: (res:any) => {

          // console.log(res.product)
          this.productList = res.product;
          this.totalPages = res.totalPage;
        }
      });
    }
  }
}
