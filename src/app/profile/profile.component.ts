import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private _location: Location,
              private _router: Router,
              private _auth: AuthService,
              private _profile: ProfileService) { }

  ngOnInit() {
    this._auth.getProfile().subscribe((data)=>{
      this.user = data.user;
    })
  }

  getUser(){
    this._profile.getUser().subscribe((user)=>{
      console.log(user)
      this.user = user;
    },
    (err)=>{
      console.log(err);
      return false;
    })
  }
}
