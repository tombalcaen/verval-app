import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() activeRouter = new EventEmitter();

  constructor(private _auth: AuthService,
              private _router: Router,
              private _activatedRouteSnap: ActivatedRoute) { }

  ngOnInit() {
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/welcome']);
  }
}
