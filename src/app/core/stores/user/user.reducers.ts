import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import { User } from "../../models/user.model";
import {UserActions} from "./user.actions";

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false,
      error: null
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    on(UserActions.getUserById, (state) => ({
      ...state,
      error: null
    })),
    on(UserActions.getUserByIdSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(req =>
        req.id === user.id ? user : req
      ),
      error: null
    })),
    on(UserActions.getUserByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),
  ),
});

export const {name: usersFeatureKey, reducer: usersReducer, selectUsers, } = userFeature;
export const selectUserById = (userId: number) =>
  createSelector(selectUsers, (users) => users.find((user) => user.id === userId));
