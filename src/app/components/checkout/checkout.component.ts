import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isLoggedIn:boolean = false;
  grandTotal:any ;
  checkOutForm:any;
  submitted:boolean = false;
  cartItems: any = [];
  product: any;
  isUseDefaultAddress:boolean = false;

  constructor(private _formBuildre:FormBuilder,
    private _cartService:CartService,
    private _authService:AuthService,
    private _router: Router,
    private _toastrService:ToastrService,
    private _orderService:OrderService) { }
// 
  ngOnInit(): void {
    this.getCartItem();
    this.grandTotal = this._cartService.getTotalAmount();

    this.checkOutForm = this._formBuildre.group({
      shippingAddress:['',[Validators.required]],
      orderAddress: ['',[Validators.required]],
      orderEmail: ['',[Validators.required]],
      phoneNumber:['',[Validators.required]]
    });

  }
  get getFormControl()
  {
    return this.checkOutForm.controls;
  }

  useDefault()
  {
    this.isUseDefaultAddress = ! this.isUseDefaultAddress;
  
    console.log(this.isUseDefaultAddress)
    console.log(this._authService.user);
  }


  getCartItem()
  {
    this._cartService.getProduct().subscribe({
      next: res =>{
        this.cartItems = res;
        console.log(this.cartItems)
      }
    })
  }

  onSubmit()
  {
    
    console.log(this.checkOutForm.value)
    if(this.grandTotal<0) 
        return;

        //Check if the user is logedd in or not
    this._authService.isLoggedIn$.subscribe({
      next: res=>{
        this.isLoggedIn = res;
      }
    }); 
    //if not then route to the login page
    if(!this.isLoggedIn)
    {
      this._toastrService.info("Please login to continue","Info")
     
      this._router.navigate(['/login'],{queryParams:{returnUrl: this._router.url}});
    }

    if(this.isUseDefaultAddress)
    {
      const user = this._authService.user;
      this.getCartItemProduct();
        const orderData = {
        "product" : this.product,
        "amount" : this.grandTotal,
        "shippingAddress" : user.address,
        "ordersAddress" : user.address,
        "orderEmail": user.email,
        "phoneNumber": user.phoneNumber,
      }

      this._orderService.createOrder(orderData).subscribe({
        next: res =>{
          this._toastrService.info("Your product has been placed successfully!");
          this._cartService.removeAllCart();  
          this._router.navigate(['profile']);
        },
        error: err =>{
          this._toastrService.error("Unsuccessfull","Error")
        }
      });
    }


    if(!this.isUseDefaultAddress){
      this.submitted = true;
      if(this.checkOutForm.invalid) return;
      this.getCartItemProduct();
      const orderData = {
        "product" : this.product,
        "amount" : this.grandTotal,
        "shippingAddress" : this.checkOutForm.value.shippingAddress,
        "ordersAddress" : this.checkOutForm.value.orderAddress,
        "orderEmail": this.checkOutForm.value.orderEmail,
        "phoneNumber": this.checkOutForm.value.phoneNumber,
      }
      console.log(orderData)
    }
  }

  getCartItemProduct()
  {
    this._cartService.getProduct().subscribe({
      next: res =>{
        console.log(res);
        this.product = res.map(
          (data:any) => {   
            return {
              productId: data.id,
              quantity: data.quantity
            }
          });
      }
    });
  }

}
