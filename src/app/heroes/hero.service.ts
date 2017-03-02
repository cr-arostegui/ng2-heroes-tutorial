import { Injectable } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';

const URL_SERVER = environment.BASE_SERVER;

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(URL_SERVER + 'heroe/')
                .toPromise()
                .then(res => res.json().data as Hero[])
                .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get(URL_SERVER + 'heroe/' + id)
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  update(hero: Hero): Promise<Hero> {
  return this.http.put(URL_SERVER + 'heroe/' + hero.id, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);
  }

  create(id: Number, name: string): Promise<Hero> {
    return this.http.post(URL_SERVER + 'heroe/create', JSON.stringify({id: id, name: name}), {headers: this.headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
  }

  delete(id: Number): Promise<void> {
    return this.http.delete(URL_SERVER + 'heroe/' + id, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
  }

  private handleError(error: Response | any): Promise<any> {
    console.log('herosevice', error.message);
    return Promise.reject(error.message || error);
  }
}
