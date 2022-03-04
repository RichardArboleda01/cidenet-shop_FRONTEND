import { LocalstorageService } from './../../../appService/localstorage.service';
import { LoginClientService } from './../../../observablesService/loginClient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../user.service';
import { User } from '../../../appEntity/user';
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
  }

  validateUserLogin() {
    this.loguedUser = this.loginClient.getInfoClient();
  }

  validateClientOn() {
    this.userActive = this.loginClient.getValidateClientOn();
  }
}
