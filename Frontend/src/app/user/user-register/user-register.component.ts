import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule,Validators, FormBuilder } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { JsonPipe, NgIf } from '@angular/common';
import { ValidationErrors, AbstractControl} from '@angular/forms';
import { UserForRegister } from '../../model/user';
import * as alertify from 'alertifyjs';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
standalone: true,
  styleUrls: ['./user-register.component.css'],
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, JsonPipe,NgIf]
})
export class UserRegisterComponent implements OnInit {
  registrationForm!:FormGroup;
  user: UserForRegister = {
    username: '',
    email: '',
    password: '',
    mobile: 0
  };
  userSubmited:boolean=false;
  router: any;
  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private alertify:AlertifyService
  ) { }

  ngOnInit() {
    this.createregistionForm();
  }
  createregistionForm(){
    this.registrationForm=this.fb.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      confirmpassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]{10}$')])
    },
    {
      validators: this.passwordMatchingValidator
    });
  }
  get username(){
    return this.registrationForm.get('username') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmpassword(){
    return this.registrationForm.get('confirmpassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
  return fc.get('password')?.value === fc.get('confirmpassword')?.value? null: { notmatched: true };
  }
  onSubmit() {
  this.userSubmited = true;

  if (this.registrationForm.valid) {  // ✅ Fixed typo
    this.authService.registeruser(this.userData()).subscribe(
      () => {
        // ✅ Success handler
        this.registrationForm.reset();
        this.userSubmited = false;
        this.alertify.success('Congrats, you are successfully registered');
        this.router.navigate(['/user/login']); // optional redirect
      },
      error => {
        // ✅ Error handler added
        const message = error?.error?.errorMessage || 'User already exists,please try different username';
        this.alertify.error(message);
      }
    );
  } else {
    this.alertify.error('Kindly provide the required fields');
  }
}
  // onSubmit(){
  //    this.userSubmited=true;
  //   if(this,this.registrationForm.valid){
  //     this.authService.registeruser(this.userData()).subscribe(()=>{
  //        this.registrationForm.reset();
  //         this.userSubmited=false;
  //         this.alertify.success('Congrats, you are successfully registered');
  //     });

  //   }
  //   else{
  //     this.alertify.error('Kindly provide the required fields');
  //   }
  // }
  userData():UserForRegister{
    return this.user={
      username:this.username.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value
    }
  }
}
