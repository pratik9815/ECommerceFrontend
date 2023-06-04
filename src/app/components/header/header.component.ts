import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined;

  public count: number = 0;
  categoryList: any;
  productList: any;
  isSelected: boolean = false;
  

  constructor(private _cartService: CartService,
    private _categoryService: CategoryService,
    private _router: Router,private _authService:AuthService, private _toastrService:ToastrService) {
    
     }

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;
    this.getCategory();
    this.getFromCart();
  }

  onLogout()
  {
    this._authService.onLogout().subscribe({
      next: res => {
        this._toastrService.info("You are logged out", "Logout");
        this._router.navigate(['/'])
        localStorage.removeItem('token');
      }
    });
  }

  getFromCart() {
    this._cartService.getProduct().subscribe({
      next: res => {
        this.count = res.length;
      }
    });
  }
  getCategory() {
    this._categoryService.getCategory().subscribe({ 
      next: res => {
        this.categoryList = res;
        console.log(this.categoryList)
      }
    });
  }
  onChange(e: any) {
    console.log(e)
    this.isSelected = !!e;
    if (this.isSelected) {
      this._router.navigate(['category-product'], { queryParams: { value: e } })
    }
  }
}
