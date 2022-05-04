import { AmbulanceData } from './../models/data';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public apiUrl = 'http://localhost:3000/ambulance';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

    // Create
    create(data: any): Observable<any> {
      let API_URL = `${this.apiUrl}`;
      return this.http.post(API_URL, data)
        .pipe(
          catchError(this.handleError)
        )
    }
  
    // Read
    list() {
      return this.http.get(`${this.apiUrl}`);
    }
  
    // Update
    update(id: any, data: any): Observable<any> {
      let API_URL = `${this.apiUrl}/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers }).pipe(
        catchError(this.handleError)
      )
    }
  
    // Delete
    delete(id: any): Observable<any> {
      var API_URL = `${this.apiUrl}/${id}`;
      return this.http.delete(API_URL).pipe(
        catchError(this.handleError)
      )
    }
  
    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };

}
