import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router,
              private _location: Location,) {
    this._auth.activateNavbar(true);
   }

  ngOnInit() {
  }

  logout(){
    this._auth.logout();
    this._router.navigate(['/welcome']);
  }

  cancel(){
    this._location.back();
  }

  done(){
    this._location.back();
  }

}
