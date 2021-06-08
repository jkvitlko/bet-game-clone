import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { GameComponent } from './game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './user-list/common/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    GameComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
