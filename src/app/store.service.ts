import { Router } from '@angular/router';
import { ShoppingCartService } from './appService/shoppingCart.service';
import { ShoppingCart } from './appEntity/shoppingCart';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myList: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  private totalPrice: number = 0;
  private finalTotalPrice = new BehaviorSubject<number>(0);
  finalTotalPrice$ = this.finalTotalPrice.asObservable();
  finalShoppingCart: ShoppingCart = new ShoppingCart;

  constructor(private cartService: ShoppingCartService, private router: Router) { }

  addProductToCart(product: Product) {
    if (product.stock > 0) {
      this.myList.push(product);
      this.myCart.next(this.myList);
      this.totalPrice += product.price;
      this.finalTotalPrice.next(this.totalPrice);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, no hay stock de este producto :(',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    }
  }

  deleteCart(product: Product) {
    this.myList = this.myList.filter(function (i) { return i.idProduct !== product.idProduct })
    this.myCart.next(this.myList);
    this.totalPrice -= product.price;
    this.finalTotalPrice.next(this.totalPrice);
  }

  saveCart() {
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.cartService.create(this.finalShoppingCart).subscribe((
      res) => {
        Swal.fire({
          icon: 'success',
          title: 'Has realizado la compra con exito',
          showConfirmButton: false,
          timer: 1500
        })
      this.router.navigate(['/shop']);
    })

  }



}