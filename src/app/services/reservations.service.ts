import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private jsonDataUrl = '../../assets/reservations.json';

  constructor(private http: HttpClient) { }

  getReservations() {
    return this.http.get(this.jsonDataUrl);
  }
}
