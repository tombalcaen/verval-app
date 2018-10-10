import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

import { InventoryComponent } from './inventory/inventory.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent },
  { path: 'profile',  component: ProfileComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent },
  /*{ path: 'emailverify',  component: EmailVerifyComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'about', component: AboutComponent},
  { path: 'living',  component: LivingComponent,
    children: [
      { path: 'general/:key',  component: GeneralComponent, canActivate: [AuthGuardService] },
      { path: 'calendar/:key',  component: CalendarComponentClass, canActivate: [AuthGuardService] },
      { path: 'property/:key',  component: PropertyComponent, canActivate: [AuthGuardService] },
      { path: 'room/:key',  component: RoomComponent, canActivate: [AuthGuardService] },
      { path: 'settings-coliving',  component: SettingsColivingComponent, canActivate: [AuthGuardService] },
      { path: 'update-coliving/:key',  component: UpdateColivingComponent, canActivate: [AuthGuardService] },
      { path: 'add-coliving/:key',  component: AddColivingComponent, canActivate: [AuthGuardService] },
      { path: 'tenant/:key',  component: TenantComponent, canActivate: [AuthGuardService] },
      { path: 'utilities/:key',  component: UtilitiesComponent, canActivate: [AuthGuardService] },
      { path: 'tenant-detail/:key',  component: TenantDetailComponent, canActivate: [AuthGuardService] },
      { path: 'invoice-detail/:key',  component: InvoiceDetailComponent, canActivate: [AuthGuardService] },
      { path: 'issues/:key',  component: IssueComponent, canActivate: [AuthGuardService] },
      { path: 'issue-detail/:key',  component: IssueDetailComponent, canActivate: [AuthGuardService] },    
      { path: 'documents/:key',  component: DocumentsComponent, canActivate: [AuthGuardService] },
      { path: 'wishlist/:key',  component: WishlistComponent, canActivate: [AuthGuardService] },
      { path: 'accounting',  component: AccountingComponent, canActivate: [AuthGuardService] },
      { path: 'contract-detail/:key',  component: ContractDetailComponent, canActivate: [AuthGuardService] }
    ]
  }*/
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }