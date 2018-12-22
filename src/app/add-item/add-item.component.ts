import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addForm : FormGroup;

  constructor(private fb: FormBuilder,
              private _route: ActivatedRoute,
              private _inventory: InventoryService,
              private _location: Location,
              public snackBar: MatSnackBar,
              ) { 
    this.createNewItemFormGroup();
  }

  listUid: any;

  ngOnInit() {
    this._route.queryParams.subscribe((p)=>{
      this.listUid = p.id;
    })
  }

  createNewItemFormGroup(){
    this.addForm = this.fb.group({
      name: [''],
      amount: [''],
      expiration_date: ['']
    })
  }

  createInventory(formData){
    var createData = {
      uid: JSON.parse(localStorage.getItem('user')).id,
      listId: this.listUid,
      name: formData.name,
      amount: formData.amount,
      expiration_date: formData.expiration_date
    }
    
    this._inventory.createInventory(createData).then((data)=>{ 
      this.snackBar.open("Added item: " + formData.name, "OK" , {duration: 3000})
      //this.getInventory();
      this.addForm.reset();      
    })
  }

  cancel(){
    this._location.back();
  }

  done(){
    this._location.back();
  }

}
