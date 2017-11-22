import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PokeStatsComponent } from './poke-stats.component';
import { D3Service } from 'd3-ng2-service';

describe('PokeStatsComponent', () => {
  let component: PokeStatsComponent;
  let fixture: ComponentFixture<PokeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeStatsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ D3Service ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeStatsComponent);
    component = fixture.componentInstance;
    component.pokemonStats = {detailRow: true, element : {
      _id : 1390793571234,
      stats : {
        'special-defense': 65,
        'speed': 45,
        'defense': 49,
        'attack': 49,
        'hp': 45,
        'special-attack': 65
      }},
      name: 'TestPokemon',
      weight: 100,
      order: 1,
      height: 100,
      is_default: true,
      id: 1,
      in_games: ['game1', 'game2'],
      moves : ['Show', 'me', 'your', 'moves'],
      type: ['poison', 'steel'],
      sprites: {front_deafult: 'Yes'}};
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component.pokemonStats);
    expect(component).toBeTruthy();
  });
});
