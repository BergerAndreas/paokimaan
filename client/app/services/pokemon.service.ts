import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PokemonService {

  constructor(private http: Http) { }

  // How does english plural work?
  getPokemen(): Observable<any> {
    return this.http.get('/api/pokemon/').map(res => res.json());
  }

  getPokemon(pokemon): Observable<any> {
    return this.http.get(`/api/pokemon/${pokemon._id}`).map(res => res.json());
  }

  // Get page of tens
  getPokePage(sort: string, order: string, page: number, filterName: string, filterType: string, minWeight: string, maxWeight: string): Observable<any> {
    return this.http.get(`/api/pokemon/prr/${page + 1}?sortBy=${sort}&order=${order}&search=${filterName}&type=${filterType}&minWeight=${minWeight}&maxWeight=${maxWeight}`).map(res => res.json());
  }

  // Get all pokemon with type
  getPokeType(type): Observable<any> {
    return this.http.get(`/api/pokemon/type/${type}`).map(res => res.json());
  }

}
