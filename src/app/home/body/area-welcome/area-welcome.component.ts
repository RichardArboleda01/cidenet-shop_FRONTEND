import { LocalstorageService } from './../../../appService/localstorage.service';
import { LoginClientService } from './../../../observablesService/loginClient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../user.service';
import { User } from './../../../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-welcome',
  templateUrl: './area-welcome.component.html',

})
export class AreaWelcomeComponent implements OnInit {
  loguedUser: User = new User;
  userActive: Boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    private loginClient: LoginClientService) {
  }

  ngOnInit(): void {
    this.validateClientOn();
    this.validateUserLogin();
    console.log("hola");
  }

  validateUserLogin() {
    this.loguedUser = this.loginClient.getInfoClient();
    console.log(this.loguedUser);
  }

  validateClientOn() {
    this.userActive = this.loginClient.getValidateClientOn();
    console.log(this.userActive);

  }
}
