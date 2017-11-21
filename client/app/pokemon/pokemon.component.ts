import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PokeStatsComponent } from '../poke-stats/poke-stats.component';
import { MatPaginator, MatSort } from '@angular/material';
import {Http} from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { AccountComponent } from '../account/account.component';
import { AuthService } from '../services/auth.service';
import { UserInterface} from '../account/account.component';
import { UserService } from '../services/user.service';

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
  displayedColumns = ['sprites', 'name', 'id', 'weight', 'height', 'type'];
  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  user: UserInterface;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private pokemonService: PokemonService,
              private auth: AuthService,
              private userService: UserService,
              private http: Http) {

              }

  ngOnInit() {
    this.dataSource = new PokemonDataSource(this.pokemonService, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }



  addPokemonToUser(pokemon){
      this.userService.getUser(this.auth.currentUser).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.addPokemon(pokemon)
      );
  }

  addPokemon(pokemon){
    if (this.user.pokemen.length > 5){
      alert('You can\'t add more pokemon to your team.');
      return;
    }
    let inTeam = false;
    for (let i = 0; i < this.user.pokemen.length; i++){
      if (this.user.pokemen[i].order === pokemon.order){
        inTeam = true;
      }
    }
    if (inTeam === false){
      this.user.pokemen.push(pokemon);
    }
    else{
      alert('Pokemon is already in your team!');
    }
    this.userService.editUser(this.user).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => inTeam = false
      );
  }
}

export class PokemonDataSource extends DataSource<any>{

  resultsLength = 0;
  pageSize = 0;

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }



  constructor(private pokemonService: PokemonService,
              private paginator: MatPaginator,
              private sort: MatSort){
    super();

  }

  connect(): Observable<Pokemon[]>{

    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page,
      this._filterChange,
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {

        console.log(this.sort.direction);
        return this.pokemonService.getPokePage(this.sort.active, this.sort.direction, this.paginator.pageIndex,                 this._filterChange.getValue());
      })
      .map((pokemen) => {
        const rows = [];
        //Let instead of const if not working
        const rendered = pokemen['docs'].slice().filter((item: Pokemon) => {
          this.pageSize = Number(pokemen['limit']);
          this.resultsLength = Number(pokemen['total']);
          const searchStr = (item.name).toLowerCase();
          console.log(searchStr);
          console.log(rows);
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
        rendered.forEach(element => rows.push(element, { detailRow: true, element }));
        return rows;
      });
  }

  disconnect() { }
}

// Interface for pokemon API
export interface Pokemon {
  _id: string;
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
