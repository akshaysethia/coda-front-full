import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminDelComponent } from './admin-del/admin-del.component';
import { CandEditComponent } from './cand-edit/cand-edit.component';
import { DetailComponent } from './detail/detail.component';
import { CandProfileComponent } from './cand-profile/cand-profile.component';
import { VoteComponent } from './vote/vote.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { ErrorProcessorService } from './services/error-processor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    AdminAddComponent,
    AdminEditComponent,
    AdminDelComponent,
    CandEditComponent,
    DetailComponent,
    CandProfileComponent,
    VoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    DataService,
    ErrorProcessorService,
  ],
  entryComponents: [VoteComponent, AdminDelComponent, AdminEditComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
