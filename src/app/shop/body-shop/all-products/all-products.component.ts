import { StoreService } from './../../../store.service';
import { CustomResponse } from './../../../custom-response';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { throwIfEmpty } from 'rxjs';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  public products: Product[] = [];
  public productCount: number = 0;


  constructor(private productService: ProductService,
     private router: Router, 
     private formBuilder: FormBuilder, 
     private activatedRoute:ActivatedRoute, 
     private store: StoreService) { 
  }

  ngOnInit(): void {
    this.getProductByCategory();
  }
  
  getAllProduct(){
    this.productService.getAll().subscribe((res:CustomResponse)=>{
      this.products=res.object_response;
      this.productCount = res.total_object;
      console.log(res);
      
    })
  
  }

  searchFilter(txtSearch: String){
    this.products.filter(item => item.name==txtSearch)
  }

  getProductByCategory():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let category=e['category'];
        
        if(category){
          this.productService.getByCategory(category).subscribe(
            (res:CustomResponse)=>{this.products=res.object_response;
             this.productCount = res.total_object;
            }
          );
        }
        else{
          this.getAllProduct();
        }
      }
    )
  }

  getByColor(idColor:number){
    this.productService.getByColor(idColor).subscribe((res:CustomResponse)=>{
      this.products=res.object_response;
      this.productCount = res.total_object;
      console.log(res);
      
    })
  
  }

  getBy(idColor:number){
    this.productService.getByColor(idColor).subscribe((res:CustomResponse)=>{
      this.products=res.object_response;
      this.productCount = res.total_object;
      console.log(res);
      
    })
  
  }

  addProductToCart(product: Product) {
    this.store.addProductToCart(product);
  }

}
