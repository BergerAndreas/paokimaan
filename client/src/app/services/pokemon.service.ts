import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PokemonService {

  constructor(private http:Http) { }

  //How does english plural work?
  getPokemen(): Observable<any> {
    return this.http.get('http://localhost:3000/api/pokemon/').map(res => res.json());
  }

  getPokemon(pokemon): Observable<any> {
    return this.http.get(`/api/cat/${pokemon._id}`).map(res => res.json());
  }
}
