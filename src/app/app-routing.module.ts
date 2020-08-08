import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DetailComponent } from './detail/detail.component';
import { CandEditComponent } from './cand-edit/cand-edit.component';
import { CandProfileComponent } from './cand-profile/cand-profile.component';
import { AdminAddComponent } from './admin-add/admin-add.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'candidate/:id', component: DetailComponent },
  {
    path: 'editCandidate',
    component: CandEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'viewProfile/:id',
    component: CandProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'adminAdd', component: AdminAddComponent },
  { path: '404', component: ErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
