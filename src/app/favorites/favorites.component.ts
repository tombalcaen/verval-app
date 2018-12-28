import { Component, OnInit } from '@angular/core';

import {AuthService} from '../service/auth.service';
import {InventoryService} from '../service/inventory.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _inventory: InventoryService) { 
    this._auth.activateNavbar(true);
  }

  favorites = [];

  blnOptions : boolean = false;

  totalSel: number = 0;

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites(){
    this.favorites = [];

    let uid = JSON.parse(localStorage.getItem('user')).id;
    this._inventory.getFavorites(uid).subscribe((data)=>{       
      this.favorites = data;
      // data.map((d)=>{
      //   this.favorites.push({id: d._id, name: d.name})                        
      // })
    })
  }

  totalSelected(){        
    this.totalSel = this.favorites.filter((item)=>{      
      return item["checked"] == true
    }).length;    
  }

  addRemove(){
    this.blnOptions = this.favorites.some((a)=>{
     return a.checked == true;
    });    
    this.totalSelected();
  }

  toggleUnFavorite(){
    
  }

  deleteFavorite(){
    var a = this.favorites.filter((data)=>{
      return data.checked;
    }).map((filtered)=>{
      return filtered._id;
    });

    this._inventory.deleteFavorites(a).then((res)=>{      
      this.getFavorites();      
    });
  }

  addToBasket(){

  }
  
}
