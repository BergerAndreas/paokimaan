import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatGridListModule } from "@angular/material";
import { CapitalizePipe } from "../pipes/capitalize.pipe";
import { PokeChartComponent } from './poke-chart.component';
import { PokemonService } from "../services/pokemon.service";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { D3Service } from "d3-ng2-service";

describe('PokeChartComponent', () => {
  let component: PokeChartComponent;
  let fixture: ComponentFixture<PokeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeChartComponent, CapitalizePipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MatGridListModule, HttpModule, RouterModule ],
      providers: [ PokemonService, D3Service ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
