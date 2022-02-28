import { LocalstorageService } from './../appService/localstorage.service';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from './../appService/shoppingCart.service';
import { ShoppingCart } from './../appEntity/shoppingCart';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../product';
import { User } from '../user';

@Injectable({
    providedIn: 'root'
})
export class LoginClientService {

    private clientLogued: User = new User;
    private clientOn = new BehaviorSubject<User>(new User);
    clientOn$ = this.clientOn.asObservable();
    private validateClientOn: Boolean = false;
    private isAdmin: Boolean = false;

    constructor(private userService: UserService,
        private router: Router,
        private localStorage: LocalstorageService) { }

    loginClient(email: string, password: string) {
        this.userService.get(email, password).subscribe((
            res: User) => {
            Swal.fire({
                icon: 'success',
                title: '!Bienvenido ' + res.firstName + '¡',
                showConfirmButton: false,
                timer: 1500
            });
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = true;
            this.clientLogued = res;
            this.localStorage.set("client", res)
            console.log(this.clientLogued);
            
            //this.validateIsAdmin();
            this.router.navigate(['/home']);
        }); console.log(this.isAdmin);
        
    }
    getValidateClientOn() {
        return this.validateClientOn
    }
    getLocalStorage() {
        if (this.localStorage.get("client") !== null) {
            this.clientLogued = this.localStorage.get("client");
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = true; 
            //this.validateIsAdmin();    
        } else {
            this.clientLogued = null!;
            this.clientOn.next(this.clientLogued);
            this.validateClientOn = false;
            this.localStorage.clear();
        } 
    }

    getInfoClient() {
        return this.localStorage.get("client");   
    }

    getInfoAdmin() {
        //this.validateIsAdmin();
        return this.isAdmin;   
    }

    closeSesionClient() {
        this.localStorage.clear();
        this.validateClientOn = false;
        this.clientLogued = new User;
        this.clientOn.next(this.clientLogued);
        //this.validateIsAdmin();
        window.location.reload();
    }
    /*validateIsAdmin() {
            if (this.clientLogued.userType[0].idRole == 2) {
                this.isAdmin = true;     
            }
    } */
}