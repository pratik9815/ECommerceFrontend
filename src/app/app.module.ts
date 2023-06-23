import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryProductComponent } from './components/product/category-product/category-product.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guard/auth.guard';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product.service';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { OrderService } from './services/order/order.service';
import { PlacedSuccessComponent } from './components/order/placed-success/placed-success.component';
import { OrderStatusComponent } from './components/order/order-status/order-status.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductListComponent } from './components/home/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { RandomProductListComponent } from './components/home/random-product-list/random-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailsComponent,
    HeaderComponent,
    CartComponent,
    CategoryProductComponent,
    SigninComponent,
    CheckoutComponent,
    ProfileComponent,
    PlacedSuccessComponent,
    OrderStatusComponent,
    RelatedProductComponent,
    OrderDetailsComponent,
    ProductListComponent,
    FooterComponent,
    RandomProductListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule ,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      // closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      preventDuplicates: true,
      countDuplicates: false,
      easeTime: 800,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoryService,
    ProductService,
    {provide : HTTP_INTERCEPTORS, useClass:InterceptorInterceptor,multi:true},
    OrderService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
