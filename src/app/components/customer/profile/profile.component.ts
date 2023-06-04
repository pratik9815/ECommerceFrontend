import { Component, OnInit } from '@angular/core';
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
  constructor(private _orderService:OrderService, private _authService:AuthService) { 
    
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

}
