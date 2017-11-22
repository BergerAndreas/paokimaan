import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import 'rxjs/add/observable/combineLatest';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

  user: UserInterface;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  dataSource: PokemonDataSource | null;
  displayedColumns = ['sprites', 'name', 'id', 'weight', 'height', 'type'];
  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  dataSource: PokemonDataSource | null;
  displayedColumns = ['sprites', 'name', 'id', 'weight', 'height', 'type'];
  pokeTypeList = ['any', 'fire', 'water', 'grass', 'bug', 'poison', 'psychic', 'dark', 'ghost', 'dragon', 'flying',
    'fighting', 'normal', 'fairy', 'steel', 'rock', 'steel', 'rock', 'ground', 'electric', 'ice'];
  chosenType: string;

  constructor(private pokemonService: PokemonService,
              private auth: AuthService,
              private userService: UserService,
              private http: Http) {
              }

  ngOnInit() {
    this.dataSource = new PokemonDataSource(
      this.pokemonService,
      this.paginator,
      this.sort
    );

    const keyUpEvent = Observable.fromEvent(
      this.filter.nativeElement, 'keyup'
    );

    keyUpEvent
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = {
          name: this.filter.nativeElement.value,
          type: (this.chosenType !== 'any' ? this.chosenType : '')
        };
      });
  }

  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  getPokemenFromClick(type: string) {
    if (!this.dataSource) { return; }

    this.dataSource.filter = {
      name: this.filter.nativeElement.value,
      type: (type !== 'any' ? type : '')
    };
  }


  // Get the user that is pushing the button
  getUserWhenPushing(pokemon) {
      this.userService.getUser(this.auth.currentUser).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.addPokemon(pokemon)
      );
  }

  // Add a pokemon to user
  addPokemon(pokemon) {
    if (this.user.pokemen.length > 5) {
      alert('You can\'t add more pokemon to your team.');
      return;
    }
    let inTeam = false;
    for (let i = 0; i < this.user.pokemen.length; i++) {
      if (this.user.pokemen[i].order === pokemon.order) {
        inTeam = true;
      }
    }
    if (inTeam === false) {
      this.user.pokemen.push(pokemon);
    } else {
      alert('Pokemon is already in your team!');
    }
    // If not already in team, update user and save to database
    this.userService.editUser(this.user).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => inTeam = false
      );
  }
}

export class PokemonDataSource extends DataSource<any> {

  resultsLength = 0;
  pageSize = 0;

  _filterChange = new BehaviorSubject({ name: '', type: '' });
  get filter(): CustomFilter { return this._filterChange.value; }
  set filter(filter: CustomFilter) { this._filterChange.next(filter); }

  constructor(private pokemonService: PokemonService,
              private paginator: MatPaginator,
              private sort: MatSort) {
    super();

  }

  connect(): Observable<Pokemon[]> {

    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page,
      this._filterChange,
    ];

    // If the user changes the sort order or filter, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this._filterChange.subscribe(() => this.paginator.pageIndex = 0);

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        return this.pokemonService.getPokePage(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this._filterChange.value.name,
          this._filterChange.value.type
        );
      })
      .map((pokemen) => {
        const rows = [];
        const rendered = pokemen['docs'].slice()
          .filter((item: Pokemon) => {
          this.pageSize = Number(pokemen['limit']);
          this.resultsLength = Number(pokemen['total']);
          const searchStr = (item.name).toLowerCase();
          return searchStr.indexOf(this.filter.name.toLowerCase()) !== -1;
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

export interface CustomFilter {
  name: string;
  type: string;
}
