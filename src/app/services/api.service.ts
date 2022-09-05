import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Atrop {

  especie: string;
  sexo: number;
  estadoDecomposicao: number;
  rodovia: string;
  sentido: string;
  lado: number;
  alimentoPista: number;

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})

export class AtropService {

  endpoint = 'http://www.ecomatriz.com.br:4000/sicor/';
  request: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  createAtrop(atrop: Atrop): Observable<any> {
    this.request = JSON.stringify(atrop);
    return this.httpClient.post<Atrop>(this.endpoint + 'ajax/cadastrarAtrop.php?e=' + this.request, JSON.stringify(atrop), this.httpOptions)
      .pipe(
        catchError(this.handleError('Error occured'))
      );
  }

  getAtrops(): Observable<Atrop[]> {
    return this.httpClient.get<Atrop[]>(this.endpoint + 'ajax/listarAtrop.php')
      .pipe(
        tap(atrops => console.log('Atrop retrieved!')),
        catchError(this.handleError<Atrop[]>('Get atrop', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
