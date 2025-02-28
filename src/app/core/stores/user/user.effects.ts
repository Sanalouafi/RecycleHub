import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { catchError, map, switchMap, of } from 'rxjs';
import {UserActions} from "./user.actions";
import {CollectionRequestActions} from "../collectionRequest/collection-request.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  loadUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserById),
      switchMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => UserActions.getUserByIdSuccess({ user })),
          catchError((error) => of(UserActions.getUserByIdFailure({ error: error.message })))
        )
      )
    );
  });

}
