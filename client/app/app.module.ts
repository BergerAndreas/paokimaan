// Components
import { NavbarComponent} from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonComponent} from './pokemon/pokemon.component';
import { PokeStatsComponent } from './poke-stats/poke-stats.component';

// Services
import { PokemonService} from './services/pokemon.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { D3Service } from 'd3-ng2-service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

// Modules
import {
  MatPaginatorModule,
  MatTableModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';

// Pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';

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
    NavbarComponent,
    PokeStatsComponent,
    CapitalizePipe
  ],
  imports: [
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
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [
    D3Service,
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
