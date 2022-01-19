import { CustomResponse } from './../../../custom-response';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getAllProduct();
  }



  getAllProduct(){
    this.productService.getAll().subscribe((res:CustomResponse)=>{
      this.products=res.object_response;
      console.log(res);
      
    })
  
  }

  getByColor(idColor:number){
    this.productService.getByColor(idColor).subscribe((res:CustomResponse)=>{
      this.products=res.object_response;
      console.log(res);
      
    })
  
  }
}
