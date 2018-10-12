import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loggedIn(){
    return !this._auth.loggedIn();
  }

}
