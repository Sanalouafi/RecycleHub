import { createActionGroup, props } from '@ngrx/store';

import {User} from "../../models/user.model";
import {LoginRequest} from "../../models/login-request.model";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register User': props<{ user: User | FormData }>(),
    'Register User Success': props<{ user: User }>(),
    'Register User Failure': props<{ error: string }>(),

    'Login User': props<{ login: LoginRequest }>(),
    'Login User Success': props<{ user: User }>(),
    'Login User Failure': props<{ error: string }>(),
  }
});
