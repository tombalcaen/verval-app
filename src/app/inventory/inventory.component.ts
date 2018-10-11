import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import { InventoryService } from '../service/inventory.service';

import * as moment from 'moment/moment';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  addForm : FormGroup;

  constructor(private _inventory: InventoryService,
              private fb: FormBuilder) {
      this.createNewItemFormGroup();
   }

  inventory = [];

  options = {
    gender : ['a','b','c']
  }

  test = "null";

  blnDelete : boolean = false;

  createNewItemFormGroup(){
    this.addForm = this.fb.group({
      name: [''],
      amount: [''],
      expiration_date: ['']
    })
  }

  ngOnInit() {
    this.getInventory();
  }

  getInventory(){  
    this.inventory = [];  
    /*this._inventory.getInventory().then((data)=>{      
      console.log(data)
      // data.map((d)=>{
      //   d.expiration_date = moment(d.expiration_date).format('DD/MM/YYYY');
      //   d.checked = false;
      // })
      this.inventory = data;   
    })*/
  }

  createInventory(formData){ 
    console.log(formData)   
    this._inventory.createInventory(formData).then((data)=>{
      this.getInventory();
    })
  }

  deleteInventory(){
    var a = this.inventory.filter((data)=>{
      return data.checked;
    }).map((filtered)=>{
      return filtered._id;
    });

    this._inventory.deleteInventory(a).then((res)=>{      
      this.getInventory();
      this.addRemove();
    });
  }

  deleteItem(){    
    var id = '5bb0a0c81c9d4400006c26ff';
    this._inventory.deleteItem(id).then((data)=>{      
      this.getInventory();
    })
  }

  addRemove(){
    this.blnDelete = this.inventory.some((a)=>{
     return a.checked == true;
    })    
  }

  getExpired(){
    this._inventory.getExpired().then((data)=>{
      console.log(data)
    })
  }

}
