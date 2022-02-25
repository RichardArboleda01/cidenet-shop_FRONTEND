import Swal from 'sweetalert2';
import { CustomResponse } from './../../custom-response';
import { ProductService } from './../../product.service';
import { AllProductsComponent } from './../../shop/body-shop/all-products/all-products.component';
import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-admin',
  templateUrl: './control-admin.component.html',
  styleUrls: ['./control-admin.component.css']
})
export class ControlAdminComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll().subscribe((res: CustomResponse) => {
      this.products = res.object_response;
    });
  }

  deleteProductById(idProduct: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(idProduct).subscribe((res: CustomResponse) => {
          if (res) {
            Swal.fire({
              title: 'El producto ha sido eliminado correctamente',
              confirmButtonText: 'Listo'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        })
      }
    })
  }
}
