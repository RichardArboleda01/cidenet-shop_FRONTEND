import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
 myCart$ = this.store.myCart$;


  constructor(
    private store: StoreService,    
  ) {}
 
  ngOnInit(): void {
      
  }
}
