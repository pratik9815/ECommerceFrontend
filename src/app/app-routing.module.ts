import { NgModule } from '@angular/core';
import { RouterModule, Routes   } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryProductComponent } from './components/product/category-product/category-product.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { PlacedSuccessComponent } from './components/order/placed-success/placed-success.component';
import { AuthGuard } from './guard/auth.guard';
import { SubCategoryProductComponent } from './components/product/sub-category-product/sub-category-product.component';
import { UpdateProfileComponent } from './components/customer/update-profile/update-profile.component';
import { ChangePasswordComponent } from './components/customer/change-password/change-password.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full"
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"product-details/:productId",
    component: ProductDetailsComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path: 'category-product',
    component:CategoryProductComponent
  },
  {
    path: 'sub-category-product',
    component:SubCategoryProductComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'order-success',
    component: PlacedSuccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'update-profile',
    component:UpdateProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
