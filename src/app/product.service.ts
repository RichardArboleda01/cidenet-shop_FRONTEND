import { CustomResponse } from './custom-response';
import { Product } from './product';
import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:String="http://localhost:8080/api/products";

  constructor(private http:HttpClient) { }

  create(newProduct: any):Observable<CustomResponse>{
    return this.http.post<CustomResponse>(this.url+'/create', newProduct);
  }

  getAll(){
    return this.http.get<CustomResponse>(this.url+`/getAll`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  getByColor(idColor: number):Observable<CustomResponse>{
    return this.http.get<CustomResponse>(this.url+`/getByColor?idColor=${idColor}`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  delete(idProduct: number):Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(this.url+`/delete?idProduct=${idProduct}`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  update(product: Product):Observable<CustomResponse>{
    return this.http.put<CustomResponse>(this.url+`/update/${product.idProduct}`, product)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }


  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
   
  
   
}

