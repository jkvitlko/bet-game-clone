import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Users } from '../models/userModel';
import { UserService } from '../services/user.service';
import { fromEvent } from "rxjs";
import {
  filter,
  debounceTime,
  tap
} from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  players;
  allPlayers = [];
  copyOfOrginalData = [];
  selectedPlayers = [];
  @ViewChild("input", { static: true }) input: ElementRef;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getPlayers();
    console.log(this.selectedPlayers);
  }

  getPlayers() {
    this.userService.getUsersList().subscribe(res => {
      if (res) {
        this.players = res;
        this.players.forEach(element => {
          element['ProfileImage'] = element['Profile Image'];
          element['Level'] = this.getRandomNo(1, 5);
          element['Wins'] = this.getRandomNo(1, 20);
          element['Id'] = this.getRandomNo(1, 36);
          delete element['Profile Image'];
        });
        this.allPlayers = this.players;
        this.copyOfOrginalData = this.players;
        console.log(this.players);
      }
    })
  }
  currentResults(currentResults) {
    this.players = currentResults;
  }

  getRandomNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  selectedPlayerEvent(isChecked, player) {
    console.log(isChecked.target.checked);
    if (isChecked.target.checked && (this.selectedPlayers.length < 9)) {
      // if (this.selectedPlayers.length > 0) {
        if (!this.selectedPlayers.includes(player)) {
          this.selectedPlayers.push(player);
        }
      // } else {
      //   this.selectedPlayers.push(player);
      // }

    } else {
      if (this.selectedPlayers.includes(player)) {
        this.selectedPlayers.forEach((res, i) => {
          if (res.Id === player.Id) {
            this.selectedPlayers.splice(i, 1);
          }
        });
      }
    }
    this.userService.setPlayers(this.selectedPlayers);
    // console.log(this.selectedPlayers.length);
  }

  startGame(){
    console.log('started')
    this.router.navigate(['/game']);
  }
  ngAfterViewInit() {
    // to make the calls less, once user takes a push of 300 miliseconds
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        filter(Boolean),
        debounceTime(300),
        tap((event: KeyboardEvent) => {
          let searchText = this.input.nativeElement.value;
          this.players = this.searchLogic(searchText, this.copyOfOrginalData);
          this.allPlayers = this.players;
        })
      )
      .subscribe();
  }

  searchLogic(searchText, orginalData) {
    if (!orginalData) {
      return [];
    }
    if (!searchText) {
      return orginalData;
    }
    searchText = searchText.toLocaleLowerCase();
    return orginalData.filter(ele => {
      return JSON.stringify(ele.Name).toLocaleLowerCase().includes(searchText);
    });
  }

}
