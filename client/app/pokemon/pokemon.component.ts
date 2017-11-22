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
import 'rxjs/add/observable/combineLatest';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
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
  @ViewChild('minFilter') minFilter: ElementRef;
  @ViewChild('maxFilter') maxFilter: ElementRef;

  dataSource: PokemonDataSource | null;
  displayedColumns = ['sprites', 'name', 'id', 'weight', 'height', 'type'];
  pokeTypeList = ['any', 'fire', 'water', 'grass', 'bug', 'poison', 'psychic', 'dark', 'ghost', 'dragon', 'flying',
    'fighting', 'normal', 'fairy', 'steel', 'rock', 'steel', 'rock', 'ground', 'electric', 'ice'];

  chosenType='any';

  constructor(private pokemonService: PokemonService,
              private auth: AuthService,
              private userService: UserService,
              private http: Http,
              private snackBar: MatSnackBar) {
              }


  ngOnInit() {
    this.dataSource = new PokemonDataSource(
      this.pokemonService,
      this.paginator,
      this.sort
    );

    // Assign listener to text-input fields
    const NameEvent = Observable.fromEvent(
      this.filter.nativeElement, 'keyup'
    );

    const MinWeightEvent = Observable.fromEvent(
      this.minFilter.nativeElement, 'keyup'
    );

    const MaxWeightEvent = Observable.fromEvent(
      this.maxFilter.nativeElement, 'keyup'
    );

    // Merge the listeners
    const allEvents = Observable.merge(NameEvent, MinWeightEvent, MaxWeightEvent);

    allEvents
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = {
          name: this.filter.nativeElement.value,
          type: (this.chosenType !== 'any' ? this.chosenType : ''),
          minWeight: this.minFilter.nativeElement.value,
          maxWeight: this.maxFilter.nativeElement.value
        };
      });
  }

  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  // Selector is stupid and must handle changes differently than text
  getPokemenFromClick(type: string) {
    if (!this.dataSource) { return; }

    this.dataSource.filter = {
      name: this.filter.nativeElement.value,
      type: (type !== 'any' ? type : ''),
      minWeight: this.minFilter.nativeElement.value,
      maxWeight: this.maxFilter.nativeElement.value
    };
  }

  // Validate Weight Fields
  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
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
      this.snackBar.open('You can\'t add more pokemon to your team, you will have to delete some pokemon.', '',{
      duration: 3500,
    });
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
      this.snackBar.open('The pokemon have been added to your team', '' ,{
      duration: 2000,
    });
    } else {
      this.snackBar.open('Pokemon is already in your team. Pick another pokemon', '' ,{
      duration: 2000,
    });
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
  _filterChange = new BehaviorSubject({ name: '', type: '', minWeight: '', maxWeight: ''});
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
          this._filterChange.value.type,
          this._filterChange.value.minWeight,
          this._filterChange.value.maxWeight
        );
      })
      .map((pokemen) => {
        const rows = [];
        pokemen["docs"].forEach(element => rows.push(element, { detailRow: true, element }));
        this.pageSize = Number(pokemen["limit"]);
        this.resultsLength = Number(pokemen["total"]);
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
  minWeight: string;
  maxWeight: string;
}
