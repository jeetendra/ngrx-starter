import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState  } from '../../store/app.states';
import { Logout } from '../../store/actions/auth.actions';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  errorMessage: string | null;
  user: User;
  isAuthenticated: boolean = false;
  getState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState)
   }

  ngOnInit() {
    this.getState.subscribe( (state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    })
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
