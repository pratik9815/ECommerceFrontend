import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined; 

  loginForm: any;
  visible:boolean =true;
  changeType:boolean = true;
  submitted:boolean = false;
  returnUrl:any;


  constructor(private _formBuilder: FormBuilder ,
              private _router: Router,
              private _authService:AuthService,
              private _toastrService:ToastrService,
              private _cartService:CartService,private _activatedRoute:ActivatedRoute) { 
                this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
              }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }


  get getFormControl(){
    return this.loginForm.controls;
  }
  onLogin() {
    this.submitted = true;
    if(this.loginForm.invalid)
    {
      this._toastrService.error("Please enter valid credentials","Error");
      return;
    }

    this._authService.onLogin(this.loginForm.value).subscribe({
      next: res =>{
        this._toastrService.success("Login success","Success");
        this._authService.user;
        if(this.returnUrl === '/checkout'){
          this._router.navigate(['/checkout'])
        }
        else{
          this._router.navigate(['/']);
        }
      },
      error: err =>{
        console.log(err)
        this._toastrService.error("Please enter valid credentials","Error");
      }
    })
  }


  viewpass()
  {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

}
