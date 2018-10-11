import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/welcome']);
  }

}
