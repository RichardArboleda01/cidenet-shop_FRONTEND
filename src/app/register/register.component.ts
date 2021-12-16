import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {passwordMatchValidator } from './myvalidation';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  user: User = new User;


  constructor(private userService: UserService, private router: Router,) {
    this.buildForm();
  }
  ngOnInit(): void {
  }
  private buildForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      idCardType: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required, Validators.min(1000000), Validators.max(99999999999999), Validators.pattern('[0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPass: new FormControl('', [Validators.required])
    },);

    this.form.valueChanges
    .pipe(
      debounceTime(1000)
    ); 
  }

  public formGet(param:any) {
    return this.form.get(param);
  }

  public validForm(param:any) {
    return this.formGet(param)!.touched && this.formGet(param)!.valid;
  }

  public invalidForm(param:any) {
    return this.formGet(param)!.touched && this.formGet(param)!.invalid;
  }

  registerUser(): void {
    const value = this.form.value
    if (this.form.valid) {
        this.userService.create(value).subscribe(
          res => this.router.navigate(['./login'])) 
    } else {
      this.form.markAllAsTouched();
    }

  }

}
