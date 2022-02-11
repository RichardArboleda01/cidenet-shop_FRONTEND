import { CustomResponse } from './../custom-response';
import { Product, ProductColor } from './../product';
import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './../user';
import { ShoppingCart } from '../appEntity/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private url:String="http://localhost:8080/api/cart";

  constructor(private http:HttpClient) { }

  create(newCart: any):Observable<CustomResponse>{
    return this.http.post<CustomResponse>(this.url+'/create', newCart);
  }

  getAll(){
    return this.http.get<CustomResponse>(this.url+`/getAll`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  getByClient(idClient: number):Observable<CustomResponse>{
    return this.http.get<CustomResponse>(this.url+`/getByidClient?idClient=${idClient}`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  delete(idCart: number):Observable<CustomResponse>{
    return this.http.delete<CustomResponse>(this.url+`/delete?idCart=${idCart}`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  update(shoppingCart: ShoppingCart):Observable<CustomResponse>{
    return this.http.put<CustomResponse>(this.url+`/update/${shoppingCart.idCart}`, shoppingCart)
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