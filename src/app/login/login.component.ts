import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _auth: AuthService) { }


  errorMsg: string = "";
  blnError: boolean = false;
  blnPassword = true;

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(loginData){    
    const user = {
      username: loginData.username,
      password: loginData.password
    }

    this._auth.authenticateUser(user).subscribe((data)=>{
      if(data.success){        
        this._auth.storeUserData(data.token,data.user);  
        this._router.navigate(['/inventory']);
      } else {
        this.blnError = true;
        this.errorMsg = data.message;
        this.loginForm.reset();
        //this._router.navigate(['/login']);
      }
    })
  }

  changeType(){    
    this.blnPassword = !this.blnPassword;
  }

}
