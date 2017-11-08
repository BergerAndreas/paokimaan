import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { MatTableModule, MatListModule } from '@angular/material'

//Components
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
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

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    AccountComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
