import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Get User By Id ': props<{userId: number | string}>(),
    'Get User By Id Success': props<{ user: User }>(),
    'Get User By Id Failure': props<{ error: string }>(),

    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),

  }
});
