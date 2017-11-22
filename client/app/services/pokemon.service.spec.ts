import { TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PokemonService } from './pokemon.service';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('PokemonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ HttpModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([PokemonService], (service: PokemonService) => {
    expect(service).toBeTruthy();
  }));
});
