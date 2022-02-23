import { LocalstorageService } from './../appService/localstorage.service';
import { User } from './../user';
import { LoginClientService } from './loginClient.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from './../appService/shoppingCart.service';
import { ShoppingCart } from './../appEntity/shoppingCart';
import Swal from 'sweetalert2';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { Product } from './../product';
import { CustomResponse } from '../custom-response';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {

  private myList: Product[] = [];
  private listChange: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  private totalPrice: number = 0;
  private finalTotalPrice = new BehaviorSubject<number>(0);
  finalTotalPrice$ = this.finalTotalPrice.asObservable();
  finalShoppingCart: ShoppingCart = new ShoppingCart;
  cantidad: number = 0;
  private userBuy: User = new User;

  constructor(private cartService: ShoppingCartService, private router: Router, private loginClient: LoginClientService, private localStorage: LocalstorageService) { 
    this.validateUserLogin();}

  ngOnInit(): void {
  }

  addProductToCart(product: Product) {

    this.listChange = this.myList.filter(function (i) { return i.idProduct == product.idProduct });
    var productChange = this.listChange[0];
    if (productChange !== undefined) {
      console.log(this.myList);
      
      this.myList = this.myList.filter(function (i) { return i.idProduct !== product.idProduct })
      console.log(this.myList);
      
      this.myList.push(productChange);
    } else {
      this.myList.push(product);
    }
    this.myCart.next(this.myList);
    this.totalPrice += product.price;
    this.finalTotalPrice.next(this.totalPrice);
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.finalShoppingCart.userBuy = this.userBuy;
    //this.localStorage.set("cart", this.finalShoppingCart)
  }

  deleteCart(product: Product) {
    this.myList = this.myList.filter(function (i) { return i.idProduct !== product.idProduct })
    this.myCart.next(this.myList);
    this.totalPrice -= product.price * product.units;
    product.stock += product.units;
    product.units = 0;
    this.finalTotalPrice.next(this.totalPrice);
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.finalShoppingCart.userBuy = this.userBuy;
    //this.localStorage.set("cart", this.finalShoppingCart)
  }

  saveCart() {
    if(this.finalShoppingCart.cartProduct.length > 0) {
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.finalShoppingCart.userBuy.idCard = 1098765433;
      this.cartService.create(this.finalShoppingCart).subscribe((res: CustomResponse) => {
      Swal.fire({
          icon: 'success',
          title: 'Productos añadidos al carrito',
          text: '¡Falta poco para que te los lleves!'
      })
      this.router.navigate(['/yourOrder/confirmOrder']);
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Algo ha salido mal :(',
      text: 'Debes agregar un producto'
  })
    }
     
    }
    getLocalStorage() {
      if (this.localStorage.get('cart') !== null) {
          this.finalShoppingCart = this.localStorage.get('cart');
          this.myCart.next(this.finalShoppingCart.cartProduct);
          this.totalPrice = this.finalShoppingCart.total;
          this.finalTotalPrice.next(this.totalPrice);
          this.myList = this.finalShoppingCart.cartProduct;
      } else {
          this.finalShoppingCart = new ShoppingCart;
          this.myCart.next(this.finalShoppingCart.cartProduct);
      }
  }

  validateUserLogin() {
    this.userBuy = this.loginClient.getInfoClient();
  }

}