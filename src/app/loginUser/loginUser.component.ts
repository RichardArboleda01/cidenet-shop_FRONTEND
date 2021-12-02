import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './loginUser.component.html',
  styleUrls: ['./loginUser.component.css']
})
export class LoginComponent implements OnInit {

emailCtrl = new FormControl ('', [Validators.required, Validators.email]);
passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private userService:UserService, private router:Router) {
    this.emailCtrl.valueChanges
    .pipe(
      debounceTime(600)
    )
    .subscribe(value => {
      console.log(value);
    });
    this.passwordCtrl.valueChanges
    .pipe(
      debounceTime(600)
    )
    .subscribe(value => {
      console.log(value);
    });
   }

  ngOnInit(): void {
  }
  getEmail(event:any) {
    event.preventDefault();
    console.log(this.emailCtrl.value);
  }

  getPassword(event:any) {
    event.preventDefault();
    console.log(this.passwordCtrl.value);
  }




  loginUser():void{
    const valueEmail = this.emailCtrl.value
    const valuePassword = this.passwordCtrl.value
    this.userService.get(valueEmail, valuePassword).subscribe(
    res=>console.log(res)
    );
  }

}
