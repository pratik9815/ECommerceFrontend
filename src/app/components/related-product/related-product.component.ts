import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {

  @Input("categoryId") categoryId :any;
  productList: any = [];
  initialProductCount:number = 3
  productsToShow: any = [];
  additionalProductsCount = 3;

  productId:any;
  constructor(private _categoryService:CategoryService,private _router:Router, private _activatedRoute:ActivatedRoute) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    // console.log(this.categoryId);
    this.productId = this._activatedRoute.snapshot.paramMap.get('productId');
    // console.log(this.productId)

    this.getProductWithCategory();
  }

  getProductWithCategory() {
    if (this.categoryId && this.productId) {

      this.categoryId.forEach((productList:any, i:any) =>{
        this._categoryService.getProductWithCategory(this.categoryId[i]).subscribe({
          next: res => {
            this.productList = this.productList.concat(res)
            .filter((product:any, index:any, self:any) =>
            index === self.findIndex((p:any) => p.id === product.id && p.id != this.productId));
            //filter is used to create a new array of products
            // product has the current product being processed,
            // index  compares the index of the current element with the index of the first occurrence of the same id
            this.productsToShow = this.productList.slice(0,this.initialProductCount);
            console.log(this.productsToShow)

          }
        });
      });

    }
  }

  showMoreProducts() {  
   const currentCount = this.productsToShow.length;
    const nextIndex = currentCount + this.additionalProductsCount;
    this.productsToShow = this.productList.slice(0, nextIndex);
    
  }

  productDetailsNavigation(productId:any)
  {
    this._router.navigate(['product-details/'+productId]);
  }

}
