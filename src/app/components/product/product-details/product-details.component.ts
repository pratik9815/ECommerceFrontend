import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { GetProductQuery } from 'src/response-interface/response';

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
    },
    {
      id: ProductStatus.Damaged,
      name: "Damaged"
    },
    {
      id: ProductStatus.LimitedStock,
      name: "Limited stock available"
    }
  ]
  categoryId: any[] = [];
  productData: any;
  count: number = 1;
  productId: any;
  // cartItem: any;

  addedToCart: boolean = false;

  quantityAfterAddedToCart: number;

  public imageUrl = environment.imageUrl;

  // private dataSubscription: Subscription;
  data: Subscription;

  constructor(private _activeRoute: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _orderService: OrderService) {
    // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnDestroy(): void {
    console.log("This method is destroyed");
    if(this.data)
    { 
      this.data.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.productId = this._activeRoute.snapshot.paramMap.get('productId');
    this.getProduct();
  }

  getProduct() {
    if (this.productId != null) {
    this.data = this._productService.getProductById(this.productId).subscribe({
        next: (res: GetProductQuery) => {
          console.log(res)  
          this.productData = res;
          this.productData.categories.forEach((category: any) => {
            this.categoryId.push(category.categoryId);
          });
          console.log(this.categoryId)
        },
        error: err => {
          // this._toastrService.error("Something went wrong","Error")
        }
      });
    }
  }

  increment() {
    if (this.count >= 1 && this.count < this.productData.quantity)
      this.count++;
  }

  decrement() {
    if (this.count > 1)
      this.count--;
  }

  addCart(products: any) {

    //since the product is not ordered so the quantity remains the same
    this.addedToCart = true; // This is to make button disable after the product is added to cart
    const modifiedProduct = JSON.parse(JSON.stringify(products));
    const originalQuantity = this.productData.quantity;

    if (originalQuantity >= this.count) {
      modifiedProduct.quantity = this.count;
      this._cartService.addToCart(modifiedProduct);
      const updatedQuantity = originalQuantity - this.count;
      this.productData.quantity = updatedQuantity; // This is for showing in the same page 
    }
    else {
      this._toastrService.error("Please select valid product quanity!")
    }


  }

  gotToCheckout(product: any) {
    this.addCart(product);
    this._router.navigate(['/checkout'])
  }


}

enum ProductStatus {
  InStock,
  OutStock,
  Damaged,
  LimitedStock
}