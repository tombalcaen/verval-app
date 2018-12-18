import { Component, Input } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import {environment} from '../environments/environment';

import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'verval-app';

  currentPane = 0;
  blnShowNav: boolean = false;

  constructor(private _swpush: SwPush,
              private _auth: AuthService){
    if(this._swpush.isEnabled){      
      this._swpush.requestSubscription({
        serverPublicKey: environment.publicKey
      })
      .then(subscription => {
        // send subscription to the server
      })
      .catch(console.error);
    }
  }

  ngOnInit(): void {
    this._auth.activateNav.subscribe((blnActiv)=>{
      console.log("en? " + blnActiv)
      this.blnShowNav = blnActiv;
    }) 
  }

  addItem($event){
    console.log('activated route: ' + $event)
  }

  test(){
    console.log("test")
  }

  swLeft($event){        
    if($event.target.nextSibling != null){      
      $event.target.classList.remove('show');
      $event.target.classList.add('hide');      
      $event.target.nextSibling.classList.remove('hide');
      $event.target.nextSibling.classList.add('show');
    }
  }

  swRight($event){
    if($event.target.previousSibling != null){     
      $event.target.classList.remove('show');
      $event.target.classList.add('hide');
      $event.target.previousSibling.classList.remove('hide');
      $event.target.previousSibling.classList.add('show');
    }    
  }

  setContainerOffsetX(offsetX, doTransition) {
    if (doTransition) {
      // $container
      //   .addClass('transition')
      //   .one(transitionEnd, function() {
      //     $container.removeClass('transition');
      //   })
    }
    // $container.css({
    //   left: offsetX
    // });
  }

}
