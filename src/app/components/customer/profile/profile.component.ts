import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'os';
import { AuthService, CustomerInfo } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedTab = 'tab1';
  orderStatus = OrderStatus.Pending;

  order: any;
  customerId: any;
  token: any;
  orderDetailsPopUpModal:boolean = false;
  orderDetails:any;
  orderDate:Date;

  orderId:any;
  userInfo:CustomerInfo;
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
    this.userInfo = this._authService.user;
    console.log(this.userInfo)
    if(this.customerId){
      this.getOrders(this.customerId);
    }
  }

  selectTab(tabName: string) {
    
    if(tabName == 'tab1')
    {
      this.orderStatus = OrderStatus.Pending;
    }
    if(tabName == 'tab2')
    {
      this.orderStatus = OrderStatus.OrderDelivered;
    }
    this.selectedTab = tabName;
    this._orderService.getOrder(this.customerId,1,this.orderStatus).subscribe({
      next: res =>{
        this.order = res;
        console.log(res)
      }
    });
  }
  

  getOrders(id:any)
  {
    this._orderService.getOrder(id,1,this.orderStatus).subscribe({
      next: res =>{
        this.order = res;
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