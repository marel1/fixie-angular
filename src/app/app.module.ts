import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PartTypesComponent } from './part-types/part-types.component';
import { ActivityDictionariesComponent } from './activity-dictionaries/activity-dictionaries.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'SignIn',
    component: SigninComponent,
  },
  {
    path: 'SignUp',
    component: SignupComponent,
  },
  {
    path: 'usersettings',
    component: UserSettingsComponent,
  },
  {
    path: 'partTypes',
    component: PartTypesComponent,
  },
  {
    path: 'activityDictionaries',
    component: ActivityDictionariesComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    SigninComponent,
    ErrorComponent,
    SignupComponent,
    UserSettingsComponent,
    PartTypesComponent,
    ActivityDictionariesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
