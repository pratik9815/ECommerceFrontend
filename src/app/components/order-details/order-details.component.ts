import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input("order-details") orderDetails:any;

  productData:any = [];
  quantity:any;
  grandTotal:number = 0;
   constructor() { }

  ngOnInit(): void {
    this.orderDetails.forEach((element:any, i:number) => {
      this.productData.push(element.product);
      this.productData.quantity = this.orderDetails[i].quantity;
    });
  }
}
