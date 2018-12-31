import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service'
import { Hero } from './hero'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl: string = 'api/heroes'; // URL to the web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
   ) { }

  /** GET: Returns all heroes. */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
       );
  }

  /** GET: Returns all heroes whose name matches a search term. */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // nothing to search -> return empty array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /** GET: Returns the hero by ID. Will 404 if not found. */
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** PUT: Updates the hero on the server. */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: Add the new hero to the server. */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** DELETE: Deletes the hero from the server. */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero == 'number' ? hero : hero.id;
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /** Log a HeroService message with the MessageService. */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
  * Handle a HTTP operation that failed. Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
