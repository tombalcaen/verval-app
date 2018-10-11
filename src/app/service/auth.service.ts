import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import 'rxjs/operators';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router, CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  authToken: any;
  user: any;

  constructor(private _http: HttpClient,
              public jwtHelper: JwtHelperService,
              private _router: Router) { }

  canActivate(){
    if(!this.loggedIn()) return true;
    else this._router.navigate(['/login']);
  }

  authenticateUser(user): Observable<any>{
    let header = new HttpHeaders();
    header.append('Content-type','application/json');
    return this._http.post('http://localhost:3000/users/authenticate',user,{headers: header});
  }

  getProfile(): Observable<any>{
    this.loadToken();
    let header = new  HttpHeaders({
      'Authorization':this.authToken,
      'Content-Type':'application/json'
    });
    return this._http.get('http://localhost:3000/users/profile',{headers: header});
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  registerUser(user): Observable<any>{
    let header = new HttpHeaders();
    header.append('Content-type','application/json');
    return this._http.post('http://localhost:3000/users/register',user,{headers: header});
  }

  storeUserData(token,user){
    console.log(token)
    console.log(user)
    localStorage.setItem("id_token",token);
    localStorage.setItem("user",JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){    
    return this.jwtHelper.isTokenExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
