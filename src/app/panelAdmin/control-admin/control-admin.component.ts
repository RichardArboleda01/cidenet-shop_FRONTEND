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

}
