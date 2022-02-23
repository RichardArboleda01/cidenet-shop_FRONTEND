import { LoginClientService } from './../observablesService/loginClient.service';
import  Swal from 'sweetalert2';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './loginUser.component.html',
  styleUrls: ['./loginUser.component.css']
})
export class LoginComponent implements OnInit {
form!: FormGroup;

  constructor(private userService:UserService, private router:Router, private validateClientOn: LoginClientService) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm() {
  this.form = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

this.form.valueChanges
.pipe(
  debounceTime(1000)
)}

public formGet(param:any) {
  return this.form.get(param);
}

public validForm(param:any) {
  return this.formGet(param)!.touched && this.formGet(param)!.valid;
}

public invalidForm(param:any) {
  return this.formGet(param)!.touched && this.formGet(param)!.invalid;
}

  loginUser():void{
    const valueEmail = this.formGet('email')?.value;
    const valuePassword = this.formGet('password')?.value;
    this.validateClientOn.loginClient(valueEmail, valuePassword);
   } 


}
