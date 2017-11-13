import {Component, OnInit, ElementRef, NgZone, OnDestroy, NgModule} from '@angular/core';
import { PokemonService } from "../services/pokemon.service";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PokeStatsComponent } from "../poke-stats/poke-stats.component";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PokemonComponent implements OnInit {

  dataSource = new PokemonDataSource(this.pokemonService);

  displayedColumns = ['sprites', 'id', 'name', 'type'];
  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() { }

}

export class PokemonDataSource extends DataSource<any>{

  constructor(private pokemonService: PokemonService){
    super();

  }

  connect(): Observable<Pokemon[]>{
    return this.pokemonService.getPokemen()
      .map( (pokemon) => {
        let rows = [];
        pokemon.forEach(element => rows.push(element, { detailRow: true, element }));
        return rows;
      });
  }

  disconnect() { }
}

//Interface for pokemon API
export interface Pokemon {
  _id:string;
  stats: object;
  name: string;
  weight: number;
  order: number;
  height: number;
  is_default: boolean;
  id: number;
  in_games: string[];
  moves: string[];
  type: string[];
  sprites: object;
}
