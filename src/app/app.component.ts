import { StoreService } from 'src/app/observablesService/store.service';
import { LoginClientService } from './observablesService/loginClient.service';
import { LocalstorageService } from './appService/localstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cidenet Shop';

  constructor(private loginClient: LoginClientService, private storeService: StoreService) {
    
  }

  ngOnInit(): void {
    this.loginClient.getLocalStorage();
    //this.storeService.getLocalStorage();
  }
}
