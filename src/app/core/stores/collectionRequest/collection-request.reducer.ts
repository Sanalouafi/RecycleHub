import { createFeature, createReducer, on } from '@ngrx/store';
import { CollectionRequestActions } from './collection-request.actions';
import {CollectionRequest} from "../../models/collection-request.model";


export interface CollectionRequestState {
  collectionRequests: CollectionRequest[];
  error: string | null;
}

 const initialState: CollectionRequestState = {
   collectionRequests: [],
   error: null
};

export const collectionRequestsFeature = createFeature({
  name: 'collectionRequestsFeatureKey',
  reducer: createReducer(
    initialState,
    on(CollectionRequestActions.getAllCollectionRequests, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.getAllCollectionRequestsSuccess, (state, action) => ({
      ...state,
      collectionRequests: action.collectionRequests,
    })),
    on(CollectionRequestActions.getAllCollectionRequestsFailure, (state, {error}) => ({
      ...state,
      error
    })),
    on(CollectionRequestActions.addNewCollectionRequest, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.addNewCollectionRequestSuccess, (state, action) => ({
      ...state,
      //collectionRequest: action.collectionRequest,
      collectionRequests: [...state.collectionRequests, action.collectionRequest],
      error: null
    })),
    on(CollectionRequestActions.addNewCollectionRequestFailure, (state, {error}) => ({
      ...state,
      error
    })),
    on(CollectionRequestActions.deleteCollectionRequestById, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.deleteCollectionRequestByIdSuccess, (state, { collectionRequestId }) => ({
      ...state,
      collectionRequests: state.collectionRequests.filter(req => req.id !== collectionRequestId),
      error: null
    })),

    on(CollectionRequestActions.deleteCollectionRequestByIdFailure, (state, {error}) => ({
      ...state,
      error
    })),
    on(CollectionRequestActions.getCollectionRequestById, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.getCollectionRequestByIdSuccess, (state, { collectionRequest }) => ({
      ...state,
      collectionRequests: state.collectionRequests.map(req =>
        req.id === collectionRequest.id ? collectionRequest : req
      ),
      error: null
    })),
    on(CollectionRequestActions.getCollectionRequestByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(CollectionRequestActions.updateCollectionRequest, (state) => ({
      ...state,
      error: null
    })),
    on(CollectionRequestActions.updateCollectionRequestSuccess, (state, { collectionRequest }) => ({
      ...state,
      collectionRequests: state.collectionRequests.map(req =>
        req.id === collectionRequest.id ? collectionRequest : req
      ),
      error: null
    })),
    on(CollectionRequestActions.updateCollectionRequestFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(CollectionRequestActions.updateCollection, (state, { id, points, voucher }) => ({
      ...state,
      collectionRequests: state.collectionRequests.map(request =>
        request.id === id ? { ...request, points: points ?? 0, voucher: voucher ?? 0 } : request
      )
    }))

  )
});

export const {name: collectionRequestsFeatureKey, reducer: collectionRequestReducer , selectCollectionRequests } = collectionRequestsFeature;
