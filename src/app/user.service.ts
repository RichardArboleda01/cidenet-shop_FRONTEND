import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './appEntity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:String="http://localhost:8080/api/users";

  constructor(private http:HttpClient) { }

  create(userRegister:User):Observable<any>{
    return this.http.post<User>(this.url+'/create', userRegister);
  }

  get(email:any, password:any):Observable<User>{
    return this.http.get<User>(this.url+`/login?email=${email}&password=${password}`)
    .pipe(map(resp => resp),
        catchError(this.error)
      );
  }

  getClientById(idClient: number):Observable<User>{
    return this.http.get<User>(this.url+`/getClient/${idClient}`)
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
