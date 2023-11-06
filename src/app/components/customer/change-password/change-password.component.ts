import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isNewPassword:boolean = true;
  isOldPassword:boolean = true;
  isConfirmPassword:boolean = true;
  submitted: boolean = false;
  
  changePasswordForm:any;

  constructor(private _formBuilder:FormBuilder,
    private _authService:AuthService,
    private _toastrService:ToastrService,
    private _router:Router) { }

  ngOnInit(): void {
    this.changePasswordForm =   this._formBuilder.group({
      oldPassword: ['',[Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)]],

      newPassword: ['',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)]],
        
      confirmPassword:['',[Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)]]
    });
  }

  get getFormControl()
  {
    return this.changePasswordForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if(this.changePasswordForm.invalid)
      return;
    if(this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmPassword)
      {
        this._toastrService.error("The new password does not match","Error");
      }
    const request = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this._authService.onChangePassword(request).subscribe({
      next: res =>{
        this._toastrService.success("Password change success.","Success");
        this._authService.onLogout().subscribe({
          next: res =>{
            this._router.navigate(['login']); 
            this._toastrService.info("Please login again to continue.","Login");
          }
        })
      },
      error: err =>{
        this._toastrService.error("Error occured while processing the request.","Error");
      }
    });
    
  }

  togglePassword(event:any)
  {
    if(event.target.id == "oldpass")
    {
      this.isOldPassword = !this.isOldPassword;
    }
    else if(event.target.id == "newpass")
    {
      this.isNewPassword = !this.isNewPassword
    }
    else if(event.target.id == "confirmnewpass")
    {
      this.isConfirmPassword = !this.isConfirmPassword;
    }
  }

}
