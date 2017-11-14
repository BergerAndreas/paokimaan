import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PokeStatsComponent } from '../poke-stats/poke-stats.component';
import { MatPaginator } from '@angular/material';


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

  dataSource: PokemonDataSource | null;
  displayedColumns = ['sprites', 'id', 'name', 'type'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.dataSource = new PokemonDataSource(this.pokemonService, this.paginator);
  }

}

export class PokemonDataSource extends DataSource<any>{

  resultsLength = 0;
  pageSize = 0;
  isLoadingResults = false;

  constructor(private pokemonService: PokemonService,
              private paginator: MatPaginator){
    super();

  }

  connect(): Observable<Pokemon[]>{

    const displayDataChanges = [
      this.paginator.page
    ];

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        let data = this.pokemonService.getPokePage(this.paginator.pageIndex+1);
        return data;
      })
      .map((pokemen) => {
        console.log(pokemen);
        const rows = [];
        this.isLoadingResults = false;
        pokemen["docs"].forEach(element => rows.push(element, { detailRow: true, element }));

        this.pageSize = Number(pokemen["limit"]);
        this.resultsLength = Number(pokemen["total"]);
        return rows;
      });
    /*
    return this.pokemonService.getPokemen()
      .map( (pokemon) => {
        const rows = [];
        pokemon.forEach(element => rows.push(element, { detailRow: true, element }));
        return rows;
      });
     */
  }

  disconnect() { }
}

// Interface for pokemon API
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
