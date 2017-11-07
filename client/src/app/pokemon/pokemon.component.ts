import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../services/pokemon.service";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokeData: Pokemon[];
  isLoading: boolean = true;

  displayedColumns:string[] = ['id', 'name'];
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemen();
  }

  getPokemen() : void {
    this.pokemonService.getPokemen().subscribe(
      data => this.pokeData = data,
      err => console.log(err),
      () => this.isLoading = false
    );
  }

}

//Interface for pokemon API
export interface Pokemon{
  _id:string,
  stats: object,
  name: string,
  weight: number,
  order: number,
  height: number,
  is_default: boolean,
  id: number,
  in_games: string[],
  moves: string[],
  type: string[],
  sprites: object
}
