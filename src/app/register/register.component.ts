import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private _fb: FormBuilder,
              private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onRegister(registerData){
    const user = {
      username: registerData.username,
      email: registerData.email,
      password: registerData.password
    }

    this._auth.registerUser(user).subscribe((data)=>{
      console.log(data)
      if(data.success){
        this._router.navigate(['/login'])
        console.log("You are successfully registered.");
      } else {
        this._router.navigate(['/register'])
        console.log("some thing went wrong");
      }
    });

  }

}
