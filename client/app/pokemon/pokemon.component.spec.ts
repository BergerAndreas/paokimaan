import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PokemonComponent } from './pokemon.component';
import { MatTableModule } from "@angular/material";
import { PokemonService } from "../services/pokemon.service";
import { HttpModule } from "@angular/http";
import { MatPaginator, MatPaginatorIntl, MatExpansionModule } from '@angular/material';


describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonComponent, MatPaginator ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports : [ MatTableModule, HttpModule, MatExpansionModule ],
      providers : [ PokemonService, MatPaginatorIntl ]
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
