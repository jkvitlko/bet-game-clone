import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Users } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json'
  players:Users[];
  constructor(private http: HttpClient) { }

  getUsersList(): Observable<Users> {
    return this.http.get<Users>(this.url);
  }

  setPlayers(players){
    this.players = players;
  }
  getPlayers() {
    return this.players;
  }
}
