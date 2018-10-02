import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

interface Item {
  _id?: string;
  name: string;
  expiration_date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }

  getInventory(): Promise<any>{    
    return this._http.get('http://localhost:3000/inventory').toPromise();
  }

  createInventory(newItem): Promise<void | Item>{
    return this._http.post('http://localhost:3000/inventory', newItem)
                .toPromise()
                .then(response => response as Item)
                .catch(this.handleError);    
  }

  deleteContact(delContactId: String): Promise<void | String> {
    return this._http.delete('http://localhost:3000/inventory' + '/' + delContactId)
               .toPromise()
               .then(response => response as String)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
