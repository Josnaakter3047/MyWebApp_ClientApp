
import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../models/login/login';
import { NotifyService } from '../../../services/notify.service';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(
    private userServie: UserService,
    private notifySvc: NotifyService,
    private router:Router
    )
  { }
 
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.login.email = this.f['email'].value;
    this.login.password = this.f['password'].value;
    this.userServie.postLogin(this.login)
      .subscribe((data: any) => {
        this.login = data;
        console.log(data);
        if (data.responseCode == 1) {
          localStorage.setItem("userInfo", JSON.stringify(data.dateSet));
          this.router.navigate(['/product']);
        }
        
      }, err => {
        this.notifySvc.fail("Fail to Log In", "DISMISS");
      })
  }
  ngOnInit(): void {
  }

}
