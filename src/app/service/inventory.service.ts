import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { AuthService } from "./auth.service";

interface Item {
  _id?: string;
  name: string;
  expiration_date: Date;
}

interface BasketItem {
  _id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient,
              private _auth: AuthService) { }

  getInventory(listUid): Observable<any>{
    var uid = JSON.parse(localStorage.getItem('user')).id    
    return this._http.get(environment.connection_uri + 'inventory/?listId=' + listUid);
  }

  createInventory(newItem): Promise<void | Item>{    
    return this._http.post(environment.connection_uri + 'inventory/', newItem)
                .toPromise()
                .then(response => response as Item)
                .catch(this.handleError);    
  }

  deleteInventory(items): Promise<any | ArrayBuffer>{  
    console.log(items)  
    return this._http.delete(environment.connection_uri + 'inventory/?items=' + items)
                .toPromise()
                .then(response => response as ArrayBuffer)
                .catch(this.handleError);
  }

  deleteItem(delContactId: String): Promise<void | string> {
    return this._http.delete(environment.connection_uri + 'inventory/' + delContactId)
               .toPromise()
               .then(response => response as string)
               .catch(this.handleError);
  }

  getExpired(){
    return this._http.get(environment.connection_uri + 'inventory/expired/')
               .toPromise()
               .then(response => response as string)
               .catch(this.handleError);
  }

  getBasket(): Observable<any>{
    var uid = JSON.parse(localStorage.getItem('user')).id
    return this._http.get(environment.connection_uri + 'basket/?uid=' + uid);
  }

  createBasket(newBasketItem): Promise<void | BasketItem>{    
    return this._http.post(environment.connection_uri + 'basket/', newBasketItem)
                .toPromise()
                .then(response => response as BasketItem)
                .catch(this.handleError);    
  }

  generateBasket(): Promise<any>{    
    var uid = JSON.parse(localStorage.getItem('user')).id
    
    return this._http.post(environment.connection_uri + 'basket/generate/', {'uid': uid})
                        .toPromise()
                        .then(response => response as BasketItem)
                        .catch(this.handleError);    
  }

  deleteAllBasket(): Promise<any>{
    var uid = JSON.parse(localStorage.getItem('user')).id

    return this._http.post(environment.connection_uri + 'basket/deleteAll/', {'uid': uid})
                        .toPromise()
                        .then(response => response as BasketItem)
                        .catch(this.handleError);    
  }

  getList(): Observable<any>{    
    var uid = JSON.parse(localStorage.getItem('user')).id
    return this._http.get(environment.connection_uri + 'list/?uid=' + uid);
  }

  createList(newList){
    return this._http.post(environment.connection_uri + 'list/', newList)
    .toPromise()
    .then(response => response as Item)
    .catch(this.handleError);    
  }

  deleteList(){

  }

  getFavorites(uid): Observable<any>{
    return this._http.get(environment.connection_uri + 'favorite/?uid=' + uid);
  }
  
  createFavorite(newItem): Promise<void | Object>{
    console.log(newItem)
    return this._http.post(environment.connection_uri + 'favorite/', newItem)
                .toPromise()
                .then(response => response)
                .catch(this.handleError);    
  }

  deleteFavorites(favoritesId){
    return this._http.delete(environment.connection_uri + 'favorite/?items=' + favoritesId)
                .toPromise()
                .then(response => response as string)
                .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
