import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productStatus = [
    {
      id: ProductStatus.InStock,
      name: "InStock"
    },
    {
      id: ProductStatus.OutStock,
      name: "OutOfStock"
    },
    {
      id: ProductStatus.Damaged,
      name: "Damaged"
    }
  ]
  categoryId:any[] = [];
  productData:any;
  count:number = 1;
  productId: any;
  cartItem: any;
  productList: any = [];  
  private dataSubscription: Subscription;
  constructor(private _activeRoute:ActivatedRoute,
              private _productService:ProductService,
              private _cartService:CartService,
              private _categoryService: CategoryService,
              private _router:Router) { 
                // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
              }


  ngOnInit(): void {
    this.productId = this._activeRoute.snapshot.paramMap.get('productId');
    this.getProduct();
  }

  getProduct()
  {
    if(this.productId != null)
    {
      this.dataSubscription = this._productService.getProductById(this.productId).subscribe({
        next: res =>{
          this.productData = res;          
          this.productData.categories.forEach((category:any) => {
            this.categoryId.push(category.categoryId);
          });
        },
        error:err =>{
          // this._toastrService.error("Something went wrong","Error")
        }
      });
    }
  }

  increment()
  {
    if(this.count>=1 && this.count < this.productData.quantity)
      this.count ++;
  }

  decrement(){
    if(this.count>1)
      this.count--;
  }

  addCart(products:any)
  {
    const modifiedProduct = JSON.parse(JSON.stringify(products));
    const originalQuantity = this.productData.quantity;
    modifiedProduct.quantity = this.count;
    
    this._cartService.addToCart(modifiedProduct);
    const updatedQuantity = originalQuantity - this.count;
    this.productData.quantity = updatedQuantity;
  }
  ngOnDestroy(): void {
    if(this.dataSubscription){
      this.dataSubscription.unsubscribe();
    }
  
  }

}

 enum ProductStatus{
  InStock,
  OutStock,
  Damaged
}