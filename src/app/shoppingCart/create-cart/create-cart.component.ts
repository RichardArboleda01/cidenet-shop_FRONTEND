import { Product } from './../../product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ShoppingCartService } from './../../appService/shoppingCart.service';
import { ShoppingCart } from './../../appEntity/shoppingCart';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/observablesService/store.service';

@Component({
  selector: 'app-create-cart',
  templateUrl: './create-cart.component.html',
  styleUrls: ['./create-cart.component.css']
})
export class CreateCartComponent implements OnInit {
  myCart$ = this.store.myCart$;
  finalPrice$ = this.store.finalTotalPrice$;


  constructor(private shoppingCart: ShoppingCartService, 
    private router: Router, 
    private store: StoreService) { 

  }

  ngOnInit(): void {
  this.store.finalTotalPrice$.subscribe();
}

  deleteCart(product:Product){
    this.store.deleteCart(product);
  }

  saveCart() {
    this.store.saveCart();
  }

}
