import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {
  productList: any;
  categoryId: any;
  productLength: number = 0;
  constructor(private _categoryService: CategoryService,
    private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe({
      next: (res: any) => {
        this.categoryId = res.value;
        this.getProductWithCategory();
      }
    });
  }
  
  getProductWithCategory() {
    if (this.categoryId) {
      this._categoryService.getProductWithCategory(this.categoryId).subscribe({
        next: (res:any) => {
          console.log(res)
          this.productList = res;
          this.productLength = this.productList.length
        }
      });
    }
  }


}
