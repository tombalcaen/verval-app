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

  expired = [];
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
    this.expired = [];
    this.inventory = []; 
    this._inventory.getInventory().subscribe((data)=>{
      data.map((d)=>{
        if(moment().add(5,'days').isSameOrAfter(moment(d.expiration_date))){
          this.expired.push({
            checked : false,
            name: d.name,
            expired_since: moment(d.expiration_date).fromNow()
          })
        }
        d.expiration_date = moment(d.expiration_date).format('DD/MM/YYYY');
        d.checked = false;
      })
      this.inventory = data;      
    }); 
  }

  createInventory(formData){
    var createData = {
      uid: JSON.parse(localStorage.getItem('user')).id,
      name: formData.name,
      amount: formData.amount,
      expiration_date: formData.expiration_date
    }
    
    this._inventory.createInventory(createData).then((data)=>{
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

  deleteItem(id){    
    this._inventory.deleteItem(id).then((data)=>{      
      this.getInventory();
    })
  }

  addRemove(){
    this.blnDelete = this.inventory.some((a)=>{
     return a.checked == true;
    })    
  }

  resetRemove(){
    this.inventory.map((item)=>{
      item.checked = false;
    })
    this.blnDelete = false;
  }

  getExpired(){
    this._inventory.getExpired().then((data)=>{
      console.log(data)
    })
  }

}
