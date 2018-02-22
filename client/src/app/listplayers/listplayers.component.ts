import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listplayers',
  templateUrl: './listplayers.component.html',
  styleUrls: ['./listplayers.component.css']
})
export class ListplayersComponent implements OnInit {
  players = [];
  playerId = "";

  constructor(private _httpService: HttpService,
        private _router: Router) { }

  ngOnInit() {
    this.getAllPlayers()
  }

  getAllPlayers(): void {
    console.log("List get all players")
    let auths = this._httpService.getPlayers();
    auths.subscribe(data => {
      this.players = data['data'];
      console.log("players: ", this.players)
    });
  }

  deletePlayer(event): void {
    var conf = confirm("Are you sure you want to delete this player?");
    if (conf) {
      this.playerId = event.target.value;
      console.log("Deleting: ", this.playerId)
      let Obs = this._httpService.deletePlayer(this.playerId);
      Obs.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log("Successfully deleted Player", this.playerId);
          // delete from team
          this._httpService.deletePlayerFromTeams(this.playerId)
        } else {
          console.log("Error: deleting Player", data['error']);
        }
      });
      // this.getAllPlayers();
    }
    this.getAllPlayers();
    this._router.navigate(['/players/list']);
  }
}
