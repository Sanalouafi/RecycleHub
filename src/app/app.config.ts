import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {provideHttpClient, withFetch } from "@angular/common/http";
import {authReducer} from "./core/stores/auth/auth.reducer";
import {AuthEffects} from "./core/stores/auth/auth.effects";
import {
  collectionRequestReducer,
  collectionRequestsFeatureKey
} from "./core/stores/collectionRequest/collection-request.reducer";
import {CollectionRequestEffects} from "./core/stores/collectionRequest/collection-request.effects";
import {usersFeatureKey, usersReducer} from "./core/stores/user/user.reducers";
import {UserEffects} from "./core/stores/user/user.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore({
      auth: authReducer,
      [usersFeatureKey]: usersReducer,
      [collectionRequestsFeatureKey]: collectionRequestReducer    }),
    provideEffects(AuthEffects, CollectionRequestEffects, UserEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
