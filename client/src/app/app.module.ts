import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';

import { RouterModule, Routes } from '@angular/router';
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
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client/authorization', component: AuthorizationComponent },
  { path: 'client/registration', component: RegistrationComponent },
  { path: 'client/about', component: AboutComponent },
  { path: 'client/settings', component: SettingsComponent, canActivate: [IsLoggedIn] },
  { path: 'client/dashboard', component: DashboardComponent, canActivate: [IsLoggedIn]},
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
    ChartsModule,
    BrowserAnimationsModule,
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
