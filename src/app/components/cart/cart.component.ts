import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product:any = [];
  grandTotal:number = 0;
  constructor(private _cartService:CartService) { }

  ngOnInit(): void {
    this._cartService.getProduct().subscribe({
      next: res =>{
        this.product = res;
        // console.log(res)
        this.grandTotal = this._cartService.getTotalAmount();
      }
    });
  }

  removeItem(item:any){
    this._cartService.removeCartItem(item);
  }
  emptyCart()
  {
    this._cartService.removeAllCart();
  }

  onCheckout()
  {
    let order = this._cartService.getProduct();
    console.log(this._cartService.cartItemList); 
  }
}
