import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from './../../user';
import { LoginClientService } from './../../observablesService/loginClient.service';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/observablesService/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
 myCart$ = this.store.myCart$;
 loguedUser: User = new User;
 userActive: Boolean = false;


  constructor(
    private store: StoreService,
    private loginClient: LoginClientService,
    private router: Router    
  ) {}
 
  ngOnInit(): void {
    this.validateClientOn();
    this.validateUserLogin();
  }
  
  validateUserLogin() {
    this.loguedUser = this.loginClient.getInfoClient();
  }

  validateClientOn() {
    this.userActive = this.loginClient.getValidateClientOn();
  }
  clientOff() {
    Swal.fire({
      icon: 'success',
      title: '¡Listo!',
      text: 'Has cerrado sesion'
  })
    this.loginClient.closeSesionClient();
    this.router.navigate(['/home']);
  }
}
