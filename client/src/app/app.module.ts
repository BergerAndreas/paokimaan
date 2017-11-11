import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Material
import { MatTableModule, MatListModule } from '@angular/material'
//Core
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonComponent} from "./pokemon/pokemon.component";
import { PokemonService} from "./services/pokemon.service";
import { MatTableModule, MatListModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material'
import { NavbarComponent} from "./navbar/navbar.component"

@NgModule({
  declarations: [
    PokemonComponent,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
 pokemonTableView
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,

    //Material
    RoutingModule,
    SharedModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    PokemonService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
