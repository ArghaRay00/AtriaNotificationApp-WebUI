import { Injectable } from '@angular/core';
import { Event } from '../model/event.model';
import { Observable, of } from 'rxjs';
import { mockEvents } from './mock-events';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events_url = 'https://localhost:5001/api/event';
  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    // return of(mockEvents);
    return this.http.get<Event[]>(this.events_url)
      .pipe(
      tap(events => {
        this.log('fetched Events');
        console.log(events);
      }),
      catchError(this.handleError('getHeroes', []))
    );
  }
  private log(arg0: string): any {
    console.log(arg0);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
