///<reference path="../../node_modules/@angular/material/table/typings/table-module.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { MatTableModule, MatListModule } from '@angular/material'
import { Routes, RouterModule } from "@angular/router";

//Components
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { AccountComponent } from './account/account.component';
import { LoginFormComponent } from './login-form/login-form.component';

//Services
import { PokemonService } from "./services/pokemon.service";
import { UserService } from "./services/user.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./auth.guard";

const appRoutes:Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'pokemon',
    component: PokemonComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  }

];


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    AccountComponent,
    LoginFormComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatListModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PokemonService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
