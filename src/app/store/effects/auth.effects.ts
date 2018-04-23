import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';

import { map, switchMap, catchError, tap } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  Signup, SignupFailure, SignupSuccess
} from "../actions/auth.actions";
import { User } from "../../models/user";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // effects go here

  @Effect()
  Login: Observable<any> = this.actions.ofType(AuthActionTypes.LOGIN).pipe(
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map(user => {
          console.log(user);
          return new LogInSuccess({ token: user.token, email: payload.email });
        }),
        catchError(error => {
          console.log(error);
          return of(new LogInFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

@Effect()
Signup: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.SIGNUP),
  map((action:Signup) => action.payload ),
  switchMap( (payload: User) => {
    return this.authService.signUp(payload.email, payload.password).pipe(
      map( user => {
        console.log("Signup success")
        return new SignupSuccess({ token: user.token, email: payload.email });
      }),
      catchError( error => {
        console.log(error);
        return of(new SignupFailure({error}));
      } )
    )
  } 
)
)

@Effect({ dispatch: false })
SignupSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.SIGNUP_SUCCESS),
  tap(user => {
    localStorage.setItem("token", user.payload.token);
    this.router.navigateByUrl("/");
  })
)

@Effect({ dispatch: false })
public LogOut: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGOUT),
  tap((user) => {
    localStorage.removeItem('token');
  })
);

@Effect({ dispatch: false })
GetStatus: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.GET_STATUS),
  switchMap(payload => {
    return this.authService.getStatus();
  })
);



}
