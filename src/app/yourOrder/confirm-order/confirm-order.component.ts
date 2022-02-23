import Swal from 'sweetalert2';
import { User } from './../../user';
import { StoreService } from 'src/app/observablesService/store.service';
import { Product } from './../../product';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  public products: Product[] = [];
  public user: User = new User;
  myCart$ = this.store.myCart$;
  finalPrice$ = this.store.finalTotalPrice$;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.finalTotalPrice$.subscribe();
  }

  endShopping() {
    Swal.fire({
      icon: 'success',
      title: '¡Tu compra ha sido exitosa! :D',
      text: 'Se ha enviado un comprobante de la compra a tu correo'
    })
  }

}
