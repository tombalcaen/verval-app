import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  @Output() blnNavbar = new EventEmitter<boolean>();

  constructor(private _auth: AuthService) { 
    this._auth.activateNavbar(false);
  }

  ngOnInit() {
    
  }

  loggedIn(){
    return !this._auth.loggedIn();
  }

}
