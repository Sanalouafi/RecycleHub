import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
        tap(action => console.log("Action reçue : ", action)),
        switchMap(({ user }) =>
        this.authService.register(user).pipe(
          map((response) => AuthActions.registerUserSuccess({ user: response })),
          catchError((error: Error) =>
            of(AuthActions.registerUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  redirectAfterRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerUserSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ login }) =>
        this.authService.login(login).pipe(
          tap(response => {
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('userId', String(response.id));
          }),
          map((response) => AuthActions.loginUserSuccess({ user: response })),
          catchError((error: Error) =>
            of(AuthActions.loginUserFailure({ error: error.message }))
          )
        )
      )
    )
  );


  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap(() => this.router.navigate(['/demande']))
      ),
    { dispatch: false }
  );
}
