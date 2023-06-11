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
  count:number = 1;

  productId:any;
  totalPage: number = 0;
  constructor(private _categoryService:CategoryService,private _router:Router, private _activatedRoute:ActivatedRoute) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    // console.log(this.categoryId);
    this.productId = this._activatedRoute.snapshot.paramMap.get('productId');
    // console.log(this.productId)

    this.getProductWithCategory(this.count);
  }

  // getProductWithCategory(count:any) {
  //   if (this.categoryId && this.productId) {

  //     this.categoryId.forEach((productList:any, i:any) =>{
  //       this._categoryService.getProductWithCategory(this.categoryId[i],count).subscribe({
  //         next: (res:any) => {
  //           this.productList = this.productList.concat(res.product)
  //           .filter((product:any, index:any, self:any) =>
  //           index === self.findIndex((p:any) => p.id === product.id && p.id != this.productId));
  //           //filter is used to create a new array of products
  //           // product has the current product being processed,
  //           // index  compares the index of the current element with the index of the first occurrence of the same id
  //           this.totalPage = res.totalPage
  //           console.log(this.productList);
  //         }
  //       });
  //     });
  //   }
  // }

  getProductWithCategory(count:any)
  {

    this._categoryService.getProductWithRespectiveCategory(this.categoryId,count).subscribe({
      next: (res:any) =>{
        this.productList = res.product;
        this.totalPage = res.totalPage;
        console.log(this.productList)
      }
    })
  }

  productDetailsNavigation(productId:any)
  {
    this._router.navigate(['product-details/'+productId]);
  }

}
