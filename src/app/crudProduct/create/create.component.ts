import { Product } from 'src/app/product';
import { CustomResponse } from './../../custom-response';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ProductColor } from './../../product';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public form!: FormGroup;
  public colors: ProductColor[] = [];
  public productColor: ProductColor[] = [];
  public newProduct: Product = new Product;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getAllColors();
    this.form = this.formBuilder.group({
      category: [''],
      name: [''],
      price: [''],
      description: [''],
      picture: [''],
      idColor: [''],
      brand: [''],
      size: [''],
      stock: [''],
    });

    this.form.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      console.log(value);
      console.log(this.colors);
    }); 
}


public formGet(param:any) {
  return this.form.get(param);
}

public validForm(param:any) {
  return this.formGet(param)!.touched && this.formGet(param)!.valid;
}

public invalidForm(param:any) {
  return this.formGet(param)!.touched && this.formGet(param)!.invalid;
}

createProduct(): void {
  const value = this.form.value;
  this.newProduct = value;
  this.productColor.push({
    idColor: value.idColor, nameColor:''
  })
  this.newProduct.idColor = this.productColor;
  this.productService.create(this.newProduct).subscribe((res)=>{
    this.router.navigate(["/shop"])
  })
 

}

getAllColors(){
  this.productService.getAllColors().subscribe((res:any)=>{
    this.colors = res;
    console.log(this.colors);
    
  })
}


 changeColor() {
  
  console.log('cambio color: ');
}

// Getter method to access formcontrols
get getIdColor() {
  return this.
  form.get('idColor');
}

changeCity(e : any) {
  console.log(e)
  this.form.setValue(e.target.value, {
    onlySelf: true
  })
}

}