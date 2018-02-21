import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { ListplayersComponent } from './listplayers/listplayers.component';
import { ManagegamesComponent } from './managegames/managegames.component';

const routes: Routes = [
  { path: 'players/addplayer', component: AddplayerComponent },
  { path: 'players/list', component: ListplayersComponent },
  { path: 'status/game/:id', component: ManagegamesComponent },
  { path: '', pathMatch: 'full', redirectTo: 'players/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
