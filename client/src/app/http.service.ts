import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {
  game1 = [];
  game2 = [];
  game3 = [];

  constructor (private _http: HttpClient) { 
    // get players and contruct teams
    console.log("service constructor ")
    let players = this.getPlayers();
    players.subscribe(data => {
      console.log("http Service inital data: ", data)
      for (let player of data['data']) {
        let new1 = {id: player._id, name: player.name, status: 'Undecided'};
        let new2 = {id: player._id, name: player.name, status: 'Undecided'};
        let new3 = {id: player._id, name: player.name, status: 'Undecided'};
        this.game1.push(new1);
        this.game2.push(new2);
        this.game3.push(new3);
      }
      console.log('team 1: ', this.game1);
      console.log('team 2: ', this.game2);
      console.log('team 3: ', this.game3);
    });
  }

  getPlayers(){
    console.log('Getting All Players')
    return this._http.get('/players');
  }

  getOnePlayer(id) {
    console.log("Getting player details");
    let pStr = "/players/" + id
    console.log("str: ", pStr)
    return this._http.get(pStr);
    // tmpObs.subscribe(data => console.log('Got one task', data));   
  }

  createPlayer(newPlayer) {
    return this._http.post('/players', newPlayer);
  }

  addPlayerToTeams(player) {
    console.log('Add new player to teams')
    let new1 = {id: player._id, name: player.name, status: 'Undecided'};
    let new2 = {id: player._id, name: player.name, status: 'Undecided'};
    let new3 = {id: player._id, name: player.name, status: 'Undecided'};
    this.game1.push(new1);
    this.game2.push(new2);
    this.game3.push(new3);
    console.log('team 1: ', this.game1);
    console.log('team 2: ', this.game2);
    console.log('team 3: ', this.game3);
  }

  updatePlayer(newPlayer) {
    let pStr = "/players/" + newPlayer['id']
    console.log("str: ", pStr)
    return this._http.put(pStr, newPlayer);
  }

  deletePlayer(id) {
    let pStr = "/players/" + id
    console.log("Deleting: ", pStr)
    return this._http.delete(pStr);
  }

  deletePlayerFromTeams(id) {
    for (var i=0; i < this.game1.length; i++) {
      if (this.game1[i].id == id) {
        this.game1.splice(i, 1);
      }
      if (this.game2[i].id == id) {
        this.game2.splice(i, 1);
      }
      if (this.game3[i].id == id) {
        this.game3.splice(i, 1);
      }
    }
    console.log('team 1: ', this.game1);
    console.log('team 2: ', this.game2);
    console.log('team 3: ', this.game3);
  }

  getTeam(id) {
    if (id == 1) {
      return this.game1;
    } else if (id == 2) {
      return this.game2;
    } else if (id == 3) {
      return this.game3;
    }
  }
}
