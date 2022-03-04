import { CustomResponse } from './../../../custom-response';
import { ProductService } from './../../../product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../appEntity/user';
import { LoginClientService } from './../../../observablesService/loginClient.service';
import { StoreService } from 'src/app/observablesService/store.service';
import { Product } from '../../../appEntity/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-prod',
  templateUrl: './popular-prod.component.html',

})
export class PopularProdComponent {
 public products: Product[] = [];
 loguedUser: User = new User;
 userActive: Boolean = false;

  constructor(
    private router: Router,
    private store: StoreService,
    private loginClient: LoginClientService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
  }
 
  getAllProduct() {
    this.productService.getMustPurchase().subscribe((res: CustomResponse) => {
      this.products = res.object_response;
    });
  }

  addProductToCart(product: Product) {
    if (product.stock > 0) {
      this.store.addProductToCart(product);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, no hay unidades disponibles de este producto :(',
      })
    }
  }

  clientNotLogued() {
    Swal.fire({
      title: 'Oops...',
      text: "Primero debes iniciar sesion...",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesion',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/login"])
      }
    })
  }

  validateUserLogin() {
    this.loguedUser = this.loginClient.getInfoClient();
  }

  validateClientOn() {
    this.userActive = this.loginClient.getValidateClientOn();
  }

}
