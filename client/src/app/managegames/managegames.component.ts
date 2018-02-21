import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-managegames',
  templateUrl: './managegames.component.html',
  styleUrls: ['./managegames.component.css']
})
export class ManagegamesComponent implements OnInit {
  roster = [];
  game = "";

  constructor(private _httpService: HttpService,
            private _router: Router,
            private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      console.log("id: ", params.get('id'))
      if (parseInt(params.get('id')) == 1) {
        this.game = 'Game 1';
      } else if (parseInt(params.get('id'))  == 2) {
        this.game = 'Game 2';
      } else if (parseInt(params.get('id'))  == 3) {
        this.game = 'Game 3';
      }

      this.roster = this._httpService.getTeam(parseInt(params.get('id')));
        console.log("roster: ", this.roster)
      });
  }

  updPlayerStatus(event, stat): void {
    // this.playerId = event.target.value;
    console.log("Updating Status of ", event.target.value)
    for (let player of this.roster) {
      console.log("Cur Player ", player)
      if (player['id'] == event.target.value) {
        if (stat == 1) {
          player['status'] = 'Playing';
        } else if (stat == 2) {
          player['status'] = 'Not Playing';
        } else if (stat == 3) {
          player['status'] = 'Undecided';
        }
        break;
      }
    }
    console.log("roster: ", this.roster)
  }

}
