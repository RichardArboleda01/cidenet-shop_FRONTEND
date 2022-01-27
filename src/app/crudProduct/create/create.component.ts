import { Product } from 'src/app/product';
import { CustomResponse } from './../../custom-response';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
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
      idColor: new FormArray([]),
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
  this.productService.create(value).subscribe((res)=>{
    this.router.navigate(["/shop"])
  })
 

}

getAllColors(){
  this.productService.getAllColors().subscribe((res:any)=>{
    this.colors = res;
    console.log(this.colors);
    
  })
}

 // Choose city using select dropdown
 changeColor() {
  
  console.log('cambio color: ');
}

// Getter method to access formcontrols
get getIdColor() {
  return this.
  form.get('idColor');
}
}
