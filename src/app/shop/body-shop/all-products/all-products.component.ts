import Swal from 'sweetalert2';
import { User } from './../../../user';
import { LoginClientService } from './../../../observablesService/loginClient.service';
import { StoreService } from './../../../observablesService/store.service';
import { CustomResponse } from './../../../custom-response';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  public products: Product[] = [];
  public productCount: number = 0;
  loguedUser: User = new User;
  userActive: Boolean = false;

  constructor(private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: StoreService,
    private loginClient: LoginClientService) {
  }

  ngOnInit(): void {
    this.getProductByCategory();
    this.validateClientOn();
    this.validateUserLogin();
  }

  getAllProduct() {
    this.productService.getAll().subscribe((res: CustomResponse) => {
      this.products = res.object_response;
      this.productCount = res.total_object;
    });
  }

  getProductByCategory(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let category = e['category'];
        if (category) {
          this.productService.getByCategory(category).subscribe(
            (res: CustomResponse) => {
              this.products = res.object_response;
              this.productCount = res.total_object;
            });
        } else {
          this.getAllProduct();
        }
      }
    )
  }

  getByColor(idColor: number) {
    this.productService.getByColor(idColor).subscribe((res: CustomResponse) => {
      this.products = res.object_response;
      this.productCount = res.total_object;
    });
  }

  getBy(idColor: number) {
    this.productService.getByColor(idColor).subscribe((res: CustomResponse) => {
      this.products = res.object_response;
      this.productCount = res.total_object;
    });
  }

  addProductToCart(product: Product) {
    if (product.stock > 0) {
      product.stock -= 1;
      product.units += 1;
      this.store.addProductToCart(product);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Lo sentimos, no hay unidades disponibles de este producto :(',
      })
    }
  }

  validateUserLogin() {
    this.loguedUser = this.loginClient.getInfoClient();
  }

  validateClientOn() {
    this.userActive = this.loginClient.getValidateClientOn();
  }

  clientNotLogued() {
    Swal.fire({
      title: 'Oops...',
      text: "Primero debes iniciar sesion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesion',
      cancelButtonText: 'Registrarse'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/login"])
      }
    })
  }
}
