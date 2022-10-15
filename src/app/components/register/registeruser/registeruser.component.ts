import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registeruser } from '../../../models/register/registeruser';
import { NotifyService } from '../../../services/notify.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  registration: Registeruser = new Registeruser();
  regForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private regSvc: UserService,
    private notifySvc: NotifyService
  )
  { }

  
  get f() {
    return this.regForm.controls;
  }
  
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.regForm.invalid) return;
    this.registration.fullname = this.f['fullName'].value;
    this.registration.email = this.f['email'].value;
    this.registration.password = this.f['password'].value;
    this.regSvc.postRegister(this.registration)
      .subscribe(r => {
        this.notifySvc.success("Registration successfully!!", "DISMISS");
        this.regForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to registration!!", "DISMISS");
      })
    
  }
}
