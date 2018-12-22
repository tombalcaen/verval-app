import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { InventoryService } from '../service/inventory.service';
import { AuthService } from '../service/auth.service';
import * as moment from 'moment/moment';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  addForm : FormGroup;
  addListForm : FormGroup;

  constructor(private _auth: AuthService,
              private _inventory: InventoryService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) {
      this._auth.activateNavbar(true);
      this.createNewItemFormGroup();
      this.createAddListForm();
   }

  expired = [];
  inventory = [];

  list = [];

  foods = [{name: "all food", value: 0},{name: "frigo", value: 0},{name: "kelder", value: 0}]

  panes = []
  active: number = 0;

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

  createAddListForm(){
    this.addListForm = this.fb.group({
      name: ['']
    })
  }

  ngOnInit() {    
    this.getList();        
  }

  getInventory(){  
    this.expired = [];
    this.inventory = []; 
    
    this._inventory.getInventory(this.panes[this.active]).subscribe((data)=>{
      data.map((d)=>{
        if(moment().add(5,'days').isSameOrAfter(moment(d.expiration_date))){
          this.expired.push({
            checked : false,
            name: d.name,
            expired_since: moment(d.expiration_date).fromNow(),
            expired_date: d.expiration_date
          })
        }
        d.expiration_date = moment(d.expiration_date).format('DD/MM/YYYY');
        d.checked = false;
      })
      this.inventory = data;      
    }); 
  }

  getList(){    
    this.list = [];
    this.panes = [];
    return this._inventory.getList().subscribe((data)=>{ 
      data.map((d)=>{        
        this.panes.push({id: d._id, name: d.name})
        this.getInventory();
      })
    })
  }

  createList(listData){
    var createData = {
      uid: JSON.parse(localStorage.getItem('user')).id,
      name: listData.name      
    }
    
    this._inventory.createList(createData).then((data)=>{      
      this.snackBar.open("Added item: " + createData.name, "OK" , {duration: 3000});      
    })
  }

  addItem(pane){
    console.log(pane)
  }

  swLeft($event,index){            
    
    if(this.panes.length > this.active ) ++this.active;
    console.log(this.panes.length + " " + this.active)
    // if($event.target.nextSibling != null){      
    //   $event.target.classList.remove('show');
    //   $event.target.classList.add('hide');      
    //   $event.target.nextSibling.classList.remove('hide');
    //   $event.target.nextSibling.classList.add('show');
    // }
  }

  swRight($event,index){
    if(this.active > 0) this.active--;
    console.log(this.panes.length + " " + this.active)

    // if($event.target.previousSibling != null){     
    //   $event.target.classList.remove('show');
    //   $event.target.classList.add('hide');
    //   $event.target.previousSibling.classList.remove('hide');
    //   $event.target.previousSibling.classList.add('show');
    // }    
  }

  createInventory(formData){
    var createData = {
      uid: JSON.parse(localStorage.getItem('user')).id,
      name: formData.name,
      amount: formData.amount,
      expiration_date: formData.expiration_date
    }
    
    this._inventory.createInventory(createData).then((data)=>{      
      this.snackBar.open("Added item: " + formData.name, "OK" , {duration: 3000})
      this.getInventory();
      this.addForm.reset();      
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

  addRemoveExpired(){
    this.blnDelete = this.expired.some((a)=>{
      return a.checked == true;
     })
  }

  resetRemove(){
    this.inventory.map((item)=>{
      item.checked = false;
    })

    this.expired.map((item)=>{
      item.checked = false;
    })

    this.blnDelete = false;
  }

  getExpired(){
    this._inventory.getExpired().then((data)=>{
      console.log(data)
    })
  }

  getColor(expired_date){
    if(moment().diff(moment(expired_date), 'day') >= 0) return 'alert-danger';
  }

  getExpiredAmount(expired_date){
    
  }

  left(){
    console.log("swipe left")
  }

  right(){
    console.log("swipe right")
  }

}
