import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokeData: object;

  constructor(private http: Http) { }


  ngOnInit() {
    this.http.get("http://localhost:3000/api/pokemon/")
      .subscribe( data => {
        console.log(data);
      });
  }

}
