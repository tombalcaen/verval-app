import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _location: Location,
              private _profile: ProfileService) { }

  ngOnInit() {
  }

  getUser(){
    this._profile.getUser().then((user)=>{
      console.log(user)
    })
  }

  back(){
    this._location.back();
  }

}
