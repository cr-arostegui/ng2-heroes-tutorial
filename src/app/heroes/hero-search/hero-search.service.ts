import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/map';

import { Hero } from './../hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
               .get(environment.BASE_SERVER + `heroe/?name=${term}`)
               .map(response => response.json().data as Hero[]);
  }
}
