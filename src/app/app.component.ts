import { Component } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'verval-app';

  constructor(private _swpush: SwPush){
    if(this._swpush.isEnabled){
      console.log("yes enabled!");
      this._swpush.requestSubscription({
        serverPublicKey: environment.publicKey
      })
      .then(subscription => {
        // send subscription to the server
      })
      .catch(console.error);
    }
  }



}
