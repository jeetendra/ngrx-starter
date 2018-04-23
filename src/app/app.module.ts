import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

import { AuthService } from "./services/auth.service";
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from "./store/app.states";

import { TodoComponent } from "./components/todo/todo.component";
import { TodoStoreService } from "./services/todo-store.service";
import {
  TokenInterceptor,
  ErrorInterceptor
} from "./services/token.interceptor";
import { StatusComponent } from "./components/status/status.component";

const ROUTES: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "status", component: StatusComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    TodoStoreService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
