import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',

  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {



  // enum : typeof Gender = Gender;
  // items : { key: number; name: string }[];
  signinForm:any;
  visible:boolean =true;
  changeType:boolean = true;
  submitted:boolean = false;

  minDate= '1910-00-00';
  maxDate= '2023-12-30';

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

  constructor(private _formBuilder:FormBuilder, private _authService:AuthService,
              private _toastrService: ToastrService,
              private _router:Router) { 

    // this.items = Object.keys(Gender).map((name,key) => ({
    //   name: name,
    //   key,
    // }));

  }

  ngOnInit(): void {
    this.signinForm = this._formBuilder.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
      email: ['',[Validators.required]],
      fullName:['',[Validators.required]],
      userType:[2],
      address:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      gender:[Gender.male],
      dob:['',[Validators.required]]
    });

  }

  get getFormControl(){
    return this.signinForm.controls;
  }
  onSignIn()
  {
    console.log(this.signinForm.value)
    this.submitted = true;
    if(this.signinForm.invalid) return;
    this._authService.onSignIn(this.signinForm.value).subscribe({
      next: res => {
        this._toastrService.success("User created successfully!");
        this._router.navigate(['login']);
        this._toastrService.info("Please login to continue","Info");
      },
      error: err =>{
        this._toastrService.error("Creating user failed","Error");
      }
    })
    
  }
  viewpass()
  {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}

export enum Gender{
 male= 0,female = 1,other = 2
}
