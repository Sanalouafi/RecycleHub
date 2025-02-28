import {createFeature, createReducer, on} from '@ngrx/store';
import { AuthActions } from './auth.actions';
import {User} from "../../models/user.model";

export const authFeatureKey = 'auth';

export interface AuthState {
user: User | null;
error: string | null;
}

 const initialState: AuthState = {
    user: null,
    error: null
};

export const authFeature = createFeature({
    name : 'auth',
    reducer : createReducer(
        initialState,
        on(AuthActions.registerUser, (state) => ({
            ...state,
            error:null
        })),
        on(AuthActions.registerUserSuccess, (state, action) => ({
            ...state,
            user: action.user
        })),
        on(AuthActions.registerUserFailure, (state, { error }) => ({
            ...state,
            error,
        })),
        on(AuthActions.loginUser, (state) => ({
            ...state,
            error: null,
        })),
        on(AuthActions.loginUserSuccess, (state, action) => ({
            ...state,
            user: action.user
        })),
        on(AuthActions.loginUserFailure, (state, { error }) => ({
            ...state,
            error,
        }))
    )
    });
export const {name: authFeautreKey, reducer:authReducer } = authFeature;
