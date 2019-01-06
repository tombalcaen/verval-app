import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSelectModule,
        MatSlideToggleModule} from '@angular/material';        
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AuthService } from './service/auth.service';
import { JwtModule,JwtHelperService } from '@auth0/angular-jwt';
import { StoryComponent } from './story/story.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ItemComponent } from './item/item.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanComponent } from './scan/scan.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { OptionsComponent } from './options/options.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    TopNavComponent,
    FrontpageComponent,
    StoryComponent,
    ItemComponent,
    ScanComponent,
    ShoppingCartComponent,
    AddItemComponent,
    FavoritesComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    AppRoutingModule,
    HttpClientModule,
    ZXingScannerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [JwtHelperService,
              AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
