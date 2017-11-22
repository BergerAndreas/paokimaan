import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pokemon } from '../pokemon/pokemon.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  user : UserInterface;
  isLoading = true;

  //Poketeam divided into tiles when displaying
  tiles = [
    {text:  'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];


  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  //Get user from database based on authentication
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

  //Check if pokemon in team, if not -> add
  changePokemenList(pokemon){
    for(var i=0; i < this.user.pokemen.length; i++){
      if (this.user.pokemen[i].order === pokemon.order){
        this.user.pokemen.splice(i, 1);
      }
      //Edit user and send to database, renders on callback
      this.userService.editUser(this.user).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.getUser()
        );
    }
  }

  //Creating a user
  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }
}

//Interface for a user
export interface UserInterface {
  _id:string;
  email:string;
  role:string;
  username:string;
  pokemen:Pokemon[];
}
