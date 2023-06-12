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

  getProductWithCategory(count:any)
  {

    this._categoryService.getProductWithRespectiveCategory(this.categoryId,count).subscribe({
      next: (res:any) =>{
        //Filter the same product
        //This returns only the unique product
        this.productList = res.product.filter((product:any) => {return product.id !== this.productId});
        this.totalPage = res.totalPage;
        // console.log(this.productList)
      }
    })
  }

  productDetailsNavigation(productId:any)
  {
    this._router.navigate(['product-details/'+productId]);
  }

}
