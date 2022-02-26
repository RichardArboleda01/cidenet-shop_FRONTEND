import Swal from 'sweetalert2';
import { Product } from 'src/app/product';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ProductColor } from './../../product';
import { CustomResponse } from 'src/app/custom-response';

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

  constructor(private productService: ProductService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.editProduct();
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
      idProduct: ['']
    });

    this.form.valueChanges
      .pipe(
        debounceTime(1000)
      );
  }

  public formGet(param: any) {
    return this.form.get(param);
  }

  public validForm(param: any) {
    return this.formGet(param)!.touched && this.formGet(param)!.valid;
  }

  public invalidForm(param: any) {
    return this.formGet(param)!.touched && this.formGet(param)!.invalid;
  }

  createProduct(): void {
    const value = this.form.value;
    this.newProduct = value;
    this.productColor.push({
      idColor: value.idColor, nameColor: ''
    })
    this.newProduct.idColor = this.productColor;
    this.productService.create(this.newProduct).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: 'Producto creado correctamente'
      })
      this.router.navigate(["/shop"])
    });
  }

  getAllColors() {
    this.productService.getAllColors().subscribe((res: any) => {
      this.colors = res;
    });
  }

  get getIdColor() {
    return this.
      form.get('idColor');
  }

  editProduct():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let idProduct=e['idProduct'];
        if(idProduct){
          this.productService.getById(idProduct).subscribe(
            (res: CustomResponse)=>{this.newProduct=res.object_response[0];
            this.form.setValue({category: this.newProduct.category, 
              name: this.newProduct.name, 
              price: this.newProduct.price, 
              description: this.newProduct.description,
              picture: this.newProduct.picture,
              idColor: this.newProduct.idColor[0].idColor,
              brand: this.newProduct.brand,
              size: this.newProduct.size,
              stock: this.newProduct.stock,
              idProduct: this.newProduct.idProduct
            })
            }
          );
        }
      }
    )
  }
}

