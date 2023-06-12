import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList:any[] = [];
  productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProduct()
  {
    return this.productList.asObservable();
  }
  setProduct(product:any)
  {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product:any)
  {
    console.log(product)
    // if(this.cartItemList.includes(product))
    // {
    //   this.cartItemList = this.cartItemList.filter((item:any)=>item.id === product.id);
    // }
    if (this.cartItemList.some((item: any) => item.id === product.id)) {
      this.cartItemList = this.cartItemList.filter((item: any) => item.id !== product.id);
    }
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalAmount();


    console.log(this.cartItemList)
  }
  getTotalAmount()
  {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += (a.price * a.quantity);
    });
    return grandTotal;
  }

  removeCartItem(product:any)
  {
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id)
      {
        this.cartItemList.splice(index,1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart()
  {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.productList.next(this.cartItemList);
  }
}
