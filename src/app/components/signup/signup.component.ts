import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { Store } from "@ngrx/store";
import { AppState, selectAuthState } from "../../store/app.states";
import { Signup } from "../../store/actions/auth.actions";
import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  host: { class: "some-class" }
})
export class SignupComponent implements OnInit {
  errorMessage: string | null;
  getState: Observable<any>;
  user: User = new User();
  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Signup(payload));
  }
}
