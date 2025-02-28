import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {createLoginValidator} from "../../core/validators/login-validators";
import {LoginRequest} from "../../core/models/login-request.model";
import { AuthActions } from "../../core/stores/auth/auth.actions";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {selectAuthError} from "../../core/stores/auth/auth.selectors";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage$!: Observable<string | null>;

  constructor(private store: Store, private fb: FormBuilder) {}
  ngOnInit() {
    this.loginForm = createLoginValidator(this.fb);
    this.errorMessage$ = this.store.pipe(select(selectAuthError));
  }
  onSubmit() {
    const formValues = this.loginForm.getRawValue();
    const login : LoginRequest = {
      email : formValues.email,
      password: formValues.password,
    }
    this.store.dispatch(AuthActions.loginUser({ login }));
  }
}


