import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ship } from '../models/ship.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'none',
    }),
  };
  constructor(private http: HttpClient) {}

  getShipList(page?: string): Observable<any> {
    return this.http.get<Ship>(
      'https://cors-anywhere.herokuapp.com/' + (page ? page : 'https://swapi.dev/api/starships'),
      this.httpOptions
    );
  }

  getShip(page: number): Observable<Ship> {
    return this.http.post<Ship>(`https://cors-anywhere.herokuapp.com/https://swapi.dev/api/starships/`, page);
  }
}
