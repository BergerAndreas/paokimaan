import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PokemonComponent } from './pokemon.component';
import { MatTableModule } from "@angular/material";
import { PokemonService } from "../services/pokemon.service";
import { HttpModule } from "@angular/http";
import { MatPaginator, MatPaginatorIntl, MatExpansionModule } from '@angular/material';
import { CapitalizePipe } from "../pipes/capitalize.pipe";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MatSnackBarModule } from "@angular/material";
import { MatSort } from "@angular/material";

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonComponent, MatPaginator, CapitalizePipe, MatSort ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports : [ MatTableModule, HttpModule, MatExpansionModule, RouterTestingModule, MatSnackBarModule ],
      providers : [ PokemonService, MatPaginatorIntl, AuthService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
