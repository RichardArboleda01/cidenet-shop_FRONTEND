import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { CustomResponse } from './../custom-response';
import { Component, OnInit } from '@angular/core';
import { User } from '../appEntity/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loguedUser: User = new User;
  userActive: Boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getProductById();

  }

  getProductById(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let idClient = e['idClient'];
        if (idClient) {
          this.userService.getClientById(idClient).subscribe(
            (res: User) => {
              this.loguedUser = res; this.userActive = true;
            }
          );
        }
      }
    )
  }

}
