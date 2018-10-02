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
    this._inventory.getInventory().then((data)=>{      
      data.map((d)=>{
        d.expiration_date = moment(d.expiration_date).format('DD/MM/YYYY');
        d.checked = false;
      })
      this.inventory = data;   
    })
  }

  createInventory(formData){    
    this._inventory.createInventory(formData).then((data)=>{      
      this.getInventory();
    })
  }

  deleteContact(item){    
    this._inventory.deleteContact(item._id).then((data)=>{
      console.log(data)
      this.getInventory();
    })
  }
  
  addRemove(event,item){
    console.log(item.checked)  
  }

}
