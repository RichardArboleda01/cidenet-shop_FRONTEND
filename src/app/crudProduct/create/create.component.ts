import Swal from 'sweetalert2';
import { Product } from 'src/app/product';
import { CustomResponse } from './../../custom-response';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ProductColor } from './../../product';
import { DomSanitizer } from '@angular/platform-browser';

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
  public images: any  = [];
  public previewImg: string = '';

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { 
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
    Swal.fire({
      icon: 'success',
      title: '¡Hecho!',
      text: 'Producto creado correctamente'
  })
    this.router.navigate(["/shop"])
  });
}

getAllColors(){
  this.productService.getAllColors().subscribe((res:any)=>{
    this.colors = res;
  });
}

// Getter method to access formcontrols
get getIdColor() {
  return this.
  form.get('idColor');
}

captureImg(event: any) {
  const getImages = event.target.files[0];
  const valuePicture = this.formGet('picture')?.value;
  this.blobFile(getImages).then((picture: any) => {
    this.previewImg = picture.base;
    console.log(picture);
    
  })
  this.images.push(getImages);
  //console.log(event.target.files);
}

//turn img to 64 base
blobFile = async ($event: any) => new Promise((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        blob: $event,
        image,
        base: reader.result
      });
    };
    reader.onerror = error => {
      resolve({
        blob: $event,
        image,
        base: null
      });
    };

  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Lo sentimos, hubo un error al cargar la imagen seleccionada',
    });
  }
})
}

