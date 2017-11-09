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

import { NavbarComponent } from './navbar/navbar.component'

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule, MatCardModule, MatMenuModule } from '@angular/material';


//Route
import {Routes, RouterModule} from '@angular/router';

const AppRoutes : Routes = [
  {path: 'pokemon', component:PokemonComponent},
  {path: 'profile', component: AccountComponent}
]

//Services
import { PokemonService } from "./services/pokemon.service";
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {PokemonComponent} from "./pokemon/pokemon.component";
import {PokemonService} from "./services/pokemon.service";
import { MatTableModule, MatListModule } from '@angular/material'

@NgModule({
  declarations: [
    PokemonComponent,
    AccountComponent,
    NavbarComponent,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(AppRoutes)
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
