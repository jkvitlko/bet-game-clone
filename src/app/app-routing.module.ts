import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {
    path: '' , component: UserListComponent
  },
  {
    path: 'game' , component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
