import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { Users } from '../models/userModel';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit , AfterViewInit{
  win;
  loadHtml = false;
  selectedPlayers = [];
  constructor(private userService: UserService,
    private cdRef : ChangeDetectorRef,
    private location: Location,
    ) { }

  ngOnInit() {
    this.selectedPlayers =  this.userService.getPlayers();
    this.win = this.getRandomNo(1, 9);
   this.loadHtml = true;
  }

  calculateWin() {
    this.selectedPlayers.forEach((res , i, arr) => {
      if (res.Bet == this.win) {
        res['wining'] = 'WINNER'
        res.Price = (2* Number(res.Price));
      } else {
        res['wining'] = 'LOSE';
      }
    })
  }
  getRandomNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit(){
    this.calculateWin();
    this.cdRef.detectChanges();
  }

  back() {
    this.location.back()
  }
  refresh(){
    this.win = this.getRandomNo(1, 9);
    this.calculateWin();
  }

}
