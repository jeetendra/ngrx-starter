import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { Store } from "@ngrx/store";
import { AppState, selectAuthState } from "../../store/app.states";
import { LogIn } from "../../store/actions/auth.actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  getState: Observable<any>;
  user: User = new User();
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
