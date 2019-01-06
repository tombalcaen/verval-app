import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from "../service/auth.service";
import { InventoryService } from "../service/inventory.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _auth: AuthService,
              private _inventory: InventoryService) {
    this._auth.activateNavbar(true);
    this.createAddForm();
   }

  createAddForm(){
    this.addForm = this.fb.group({
      name: ['',Validators.required]
    })  
  }

  basket = [];
  totalSel: number = 0;

  ngOnInit() {
    this.initBasket();
  }

  initBasket(){
    this._inventory.getBasket().subscribe((data)=>{
      // data.map((d)=>{        
      //     this.basket.push({
      //       name: d.name            
      //     })        
      // })
      this.basket = data;      
    });
  }

  addItemToBasket(item){
    var createData = {
      uid: JSON.parse(localStorage.getItem('user')).id,
      name: item.name      
    }
    
    this._inventory.createBasket(createData).then((data)=>{      
      // this.snackBar.open("Added item: " + formData.name, "OK" , {duration: 3000})
      this.initBasket();
      this.addForm.reset();      
    })
  }

  deleteAll(){
    this._inventory.deleteAllBasket().then((data)=>{
      this.initBasket();
    })
  }

  RemoveBasketItems(){
    
  }
  
  generateFavorites(){
    this._inventory.generateBasket().then(()=>{
      this.initBasket();
    });
  }

}
