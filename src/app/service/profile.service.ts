import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  getUser(): Promise<any>{    
    return this._http.get('http://localhost:3000/users/profile').toPromise();
  }

}
