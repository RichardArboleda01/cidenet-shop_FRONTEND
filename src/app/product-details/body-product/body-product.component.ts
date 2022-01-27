import { CustomResponse } from './../../custom-response';
import { Product, ProductColor } from 'src/app/product';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-product',
  templateUrl: './body-product.component.html'
})
export class BodyProductComponent implements OnInit {

  public getProduct: Product = new Product;
  public idColorTest: any = 0;

  constructor(private productService: ProductService, private router: Router, private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getProductById();
    
  }

  getProductById():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let idProduct=e['idProduct'];
       
        
        if(idProduct){
          this.productService.getById(idProduct).subscribe(
            (res:CustomResponse)=>{this.getProduct=res.object_response[0]; console.log(res);
            }
          );
        }
      }
    )
  }

  changeColor(e:any) {
    this.idColorTest = e
    console.log(this.idColorTest)
   
  }
 

}
