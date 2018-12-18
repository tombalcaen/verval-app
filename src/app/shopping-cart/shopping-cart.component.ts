import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InventoryService } from "../service/inventory.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder,
              private _inventory: InventoryService) {
    this.createAddForm();
   }

  createAddForm(){
    this.addForm = this.fb.group({
      name: ['',Validators.required]
    })  
  }

  basket = [];

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

  RemoveBasketItems(){
    
  }
}