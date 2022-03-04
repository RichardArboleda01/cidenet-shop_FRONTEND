import { LocalstorageService } from './../appService/localstorage.service';
import { User } from '../appEntity/user';
import { LoginClientService } from './loginClient.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from './../appService/shoppingCart.service';
import { ShoppingCart } from './../appEntity/shoppingCart';
import Swal from 'sweetalert2';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { Product } from '../appEntity/product';
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

  constructor(private cartService: ShoppingCartService,
    private router: Router,
    private loginClient: LoginClientService, 
    private localStorage: LocalstorageService)
    {
    this.validateUserLogin();
    this.getLocalStorage();
  }

  ngOnInit(): void {
  }

  validateUserLogin() {
    this.userBuy = this.loginClient.getInfoClient();
  }

 /**
  * Add a product to the shopping cart
  * @param {Product} product - The product that will be added to the cart.
  */
  addProductToCart(product: Product) {
    this.listChange = this.myList.filter(function (i) { return i.idProduct == product.idProduct });
    var productChange = this.listChange[0];
    if (productChange !== undefined) {
      if (product.stock - productChange.units >= 0) {
        this.myList = this.myList.filter(function (i) { return i.idProduct !== product.idProduct })

        product.stock -= 1;
        productChange.units += 1;
        this.myList.push(productChange);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Lo sentimos, ya tienes en carrito el tope de stock',
        })
      }
    } else {
      product.units += 1;
      product.stock -= 1;
      this.myList.push(product);
    }
    this.myCart.next(this.myList);
    this.totalPrice += product.price;
    this.finalTotalPrice.next(this.totalPrice);
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.localStorage.set("cart", this.finalShoppingCart)
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
    this.localStorage.set("cart", this.finalShoppingCart)
  }

  saveCart(userConfirm: User) {
    if (this.finalShoppingCart.cartProduct.length > 0) {
      this.finalShoppingCart.cartProduct = this.myList;
      this.finalShoppingCart.total = this.totalPrice;
      this.finalShoppingCart.userBuy = userConfirm;
      Swal.fire({
        title: 'Estamos procesando tu compra!',
        html: 'Esperanos un momento... <b></b>',
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          this.cartService.create(this.finalShoppingCart).subscribe((res: CustomResponse) => {
          })
        },
        willClose: () => {
          clearInterval()
          
          this.localStorage.remove('cart');
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
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

  saveCartLocalStorage() {
    this.finalShoppingCart.cartProduct = this.myList;
    this.finalShoppingCart.total = this.totalPrice;
    this.localStorage.set("cart", this.finalShoppingCart);

  }
}