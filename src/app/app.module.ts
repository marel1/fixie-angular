import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { SigninComponent } from './signin/signin.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes:Routes=[
  {
    path:'',
    component:MainComponent,
    pathMatch:'full'
  },
  {
    path:'SignIn',
    component:SigninComponent
  },
  {
    path:'SignUp',
    component:SignupComponent
  },
  {
    path:'**',
    component:ErrorComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    SigninComponent,
    ErrorComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
