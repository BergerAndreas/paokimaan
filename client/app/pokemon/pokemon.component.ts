import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { AccountComponent } from '../account/account.component';
import { AuthService } from '../services/auth.service';
import { UserInterface} from '../account/account.component'
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
  displayedColumns = ['sprites', 'id', 'name', 'type'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isExpansionDetailRow = (row) => row.hasOwnProperty('detailRow');

  user: UserInterface;

  constructor(private pokemonService: PokemonService,
              private auth: AuthService,
              private userService: UserService) {

              }

  ngOnInit() {
    this.dataSource = new PokemonDataSource(this.pokemonService, this.paginator);
  }



  addPokemonToUser(pokemon){
      this.userService.getUser(this.auth.currentUser).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.addPokemon(pokemon)
      );
  }

  addPokemon(pokemon){
    if(this.user.pokemen.length > 5){
      alert("You can't add more pokemon to your team.");
      return;
    }
    var inTeam = false;
    for(var i=0; i < this.user.pokemen.length; i++){
      if(this.user.pokemen[i].order === pokemon.order){
        inTeam = true;
      }
    }
    if (inTeam===false){
      this.user.pokemen.push(pokemon);
    }
    else{
      alert("Pokemon is already in your team!")
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
