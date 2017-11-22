import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pokemon } from '../pokemon/pokemon.component';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  user: UserInterface;
  isLoading = true;

  // Poketeam divided into tiles when displaying
  tiles = [
    {text:  'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];


  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUser();
  }

  // Get user from database based on authentication
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.notloading()
    );
  }

  notloading() {
    this.isLoading = false;

  }

  // Check if pokemon in team, if not -> add
  changePokemenList(pokemon) {
    for (let i = 0; i < this.user.pokemen.length; i++) {
      if (this.user.pokemen[i].order === pokemon.order) {
        this.user.pokemen.splice(i, 1);
      }
      this.snackBar.open('Your pokemon list have now been updated', '',{
        duration: 2500,
      });
      // Edit user and send to database, renders on callback
      this.userService.editUser(this.user).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.getUser()
        );
    }
  }

  // Creating a user
  save(user) {
    this.userService.editUser(user).subscribe(
      res => {this.snackBar.open('Your account settings have been updated', '',{
        duration: 2500,
      });},
      error => console.log(error)
    );
  }
}

// Interface for a user
export interface UserInterface {
  _id: string;
  email: string;
  role: string;
  username: string;
  pokemen: Pokemon[];
}
