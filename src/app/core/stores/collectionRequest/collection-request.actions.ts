import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {CollectionRequest} from "../../models/collection-request.model";

export const CollectionRequestActions = createActionGroup({
  source: 'CollectionRequest',
  events: {
    'Get All CollectionRequests': emptyProps(),
    'Get All CollectionRequests Success': props<{ collectionRequests: CollectionRequest[] }>(),
    'Get All CollectionRequests Failure': props<{ error: string }>(),

    'Add New CollectionRequest': props<{collectionRequest: CollectionRequest }>(),
    'Add New CollectionRequest Success': props<{collectionRequest: CollectionRequest }>(),
    'Add New CollectionRequest Failure': props<{ error: string }>(),

    'Get CollectionRequest By Id ': props<{collectionRequestId: number}>(),
    'Get CollectionRequest By Id Success': props<{ collectionRequest: CollectionRequest }>(),
    'Get CollectionRequest By Id Failure': props<{ error: string }>(),

    'Delete CollectionRequest By Id ': props<{collectionRequestId: number}>(),
    'Delete CollectionRequest By Id Success':props<{collectionRequestId: number}>(),
    'Delete CollectionRequest By Id Failure': props<{ error: string }>(),

    'Update CollectionRequest': props<{ collectionRequest: CollectionRequest }>(),
    'Update CollectionRequest Success': props<{ collectionRequest: CollectionRequest }>(),
    'Update CollectionRequest Failure': props<{ error: string }>(),
    'Update Collection': props<{ id: number; points: number; voucher: number }>()
  }
});
