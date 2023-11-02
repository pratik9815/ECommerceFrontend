import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService, CustomerInfo } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Gender, UpdateUserCommand } from 'src/app/services/interfaces';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  gender: any = [
    {
      id : Gender.male,
      name : "Male"
    },
    {
      id : Gender.female,
      name : "Female"
    },
    {
      id : Gender.other,
      name : "Others"
    },
  ]

  submitted: boolean = false;
  editForm: any;
  customerId: any;
  userInfo:any;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService:ToastrService,
    private _router:Router, private _customerService:CustomerService) { }

  ngOnInit(): void {

    this.customerId = this._authService.user.customerId;
    // this.userInfo = this._authService.user;
    // console.log(this.userInfo)

    this.editForm = this._formBuilder.group({
      id: [null],
      fullName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]],
      address: ['',[Validators.required]],
      userName: [null,[Validators.required]],
      dob:[null]
    });
    // this.editForm.patchValue(this.userInfo)

    this._customerService.getCustomerById(this.customerId).subscribe({
      next: (res:any) =>{
        console.log(res);
        this.editForm.patchValue(res)
      }
    });
  }

  get getFormControl()
  {
      return this.editForm.controls;
  }

  saveChanges() 
  {
    this.submitted = true;
    console.log(this.editForm.value);
    console.log(this.editForm.valid);
    const user : UpdateUserCommand = this.editForm.value;
    this._authService.onUpdateUser(user).subscribe({
      next: res =>{
        this._toastrService.success("SUCCESS");
        this._router.navigate(["profile"]);
      },
    })

  }


  onChange(deviceValues:any) {
    // this.cities = this.countries.filter(x => x.id == deviceValue)[0].cities;
  }

}
