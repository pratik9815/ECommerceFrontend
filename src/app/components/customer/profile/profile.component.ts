import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  order: any;
  customerId: any;
  token: any;
  orderDetailsPopUpModal:boolean = false;
  orderDetails:any;

  orderId:any;

  OrderStatus = [
    {
      id: OrderStatus.Pending,
      name:"Pending",
    },
    {
      id: OrderStatus.OrderRejected,
      name:"OrderRejected",
    },
    {
      id: OrderStatus.OrderProcessing,
      name:"OrderProcessing",
    },
    {
      id: OrderStatus.OrderDelivered,
      name:"OrderDelivered",
    },

  ]


  constructor(private _orderService:OrderService, private _authService:AuthService,
              private _toastrService:ToastrService) { 
    
  }

  ngOnInit(): void {
    this.customerId = this._authService.user.customerId;
    if(this.customerId){
      this.getOrders(this.customerId);
    }
  }
  

  getOrders(id:any)
  {
    this._orderService.getOrder(id).subscribe({
      next: res =>{
        this.order = res;
        console.log(this.order)
        // console.log(this.order[0].orderDetails[0].product.id)
      }
    });
  }
  onDetails(orderDetails:any)
  {
    this.orderDetailsPopUpModal = true;
    this.orderDetails = orderDetails ; 
  }

  close()
  {
    this.orderDetailsPopUpModal = false;
  }


  removeOrder()
  {
    this._orderService.removeOrder(this.orderId).subscribe({
      next: res =>{
        this._toastrService.info("Order removed","Info");
        this.getOrders(this.customerId);
      },
      error: err =>{
        this._toastrService.error("Something went wrong!","Error");
      }
    })
  }

  getId(id:any)
  {
    this.orderId = id;
    console.log(this.orderId)
  }

}

enum OrderStatus{
  Pending = 0,
  OrderRejected = 1,
  OrderProcessing = 2,
  OrderDelivered = 3
}