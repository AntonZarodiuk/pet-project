import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';

import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

import { CheckFormService } from './check-form.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { IsLoggedIn } from './isLogged.guard';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { InfoService } from './info.service';

export function tokenGetter() {
  return localStorage.getItem("token");
}


const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [IsLoggedIn] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn]},
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AuthorizationComponent,
    RegistrationComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    DashboardComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    CheckFormService,
    AuthService,
    JwtHelperService,
    IsLoggedIn,
    InfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
