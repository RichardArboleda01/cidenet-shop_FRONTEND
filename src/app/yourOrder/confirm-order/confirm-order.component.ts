import { LoginClientService } from './../../observablesService/loginClient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './../../user';
import { StoreService } from 'src/app/observablesService/store.service';
import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  public products: Product[] = [];
  public user: User = this.loginClient.getInfoClient();;
  myCart$ = this.store.myCart$;
  finalPrice$ = this.store.finalTotalPrice$;
  form!: FormGroup;


  constructor(private store: StoreService, private loginClient: LoginClientService)
   { this.buildForm(); }

  ngOnInit(): void {
    this.infoUser();
    this.store.finalTotalPrice$.subscribe();
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
    });
  
  this.form.valueChanges
  .pipe(
    debounceTime(1000)
    
  ).subscribe(value=> {
    console.log(value);
    
  })}

  infoUser() {
    this.form.setValue({email: this.user.email, address: ''
    })
    console.log(this.user);
    
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

  endShopping() {
    this.user.email = this.form.get('email')?.value;
    this.user.address = this.form.get('address')?.value;
    this.store.saveCart(this.user);
    
  }

}
