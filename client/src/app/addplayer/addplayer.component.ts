import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  newPlayer = {name: "", position: ""}

  constructor(private _httpService: HttpService,
            private _router: Router) { }

  ngOnInit() {
  }

  createPlayer(): void {
    console.log('Creating: ', this.newPlayer)
    let Obs = this._httpService.createPlayer(this.newPlayer);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log('Successfully create player', data);
        // add new player to teams
        this._httpService.addPlayerToTeams(data['data']);  
        // reset fields
        this.newPlayer.name="";
        this.newPlayer.position="";
        this._router.navigate(['/players/list'])
      } else {
        console.log('Error: Create Player', data['error']);
      }
    });
  }

}
