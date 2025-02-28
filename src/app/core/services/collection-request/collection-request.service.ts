import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CollectionRequest} from "../../models/collection-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private api = `${environment.apiUrl}/collectionRequests`;

  constructor(private http: HttpClient) { }

  saveCollectionRequest(collectionRequest: CollectionRequest): Observable<CollectionRequest> {
    return this.http.post<CollectionRequest>(this.api, collectionRequest);
  }
  getCollectionRequests(): Observable<CollectionRequest[]> {
    return this.http.get<CollectionRequest[]>(this.api);
  }
  deleteCollectionRequest(collectionRequestId: number) {
    return this.http.delete(`${this.api}/${collectionRequestId}`);
  }

  updateCollectionRequest(collectionRequest: CollectionRequest, collectionRequestId: number): Observable<CollectionRequest> {
    return this.http.put<CollectionRequest>(`${this.api}/${collectionRequestId}`, collectionRequest);
  }
  getCollectionRequestById(collectionRequestId: number): Observable<CollectionRequest> {
    return this.http.get<CollectionRequest>(`${this.api}/${collectionRequestId}`);
  }
  updateStatus(collectionRequestId: number , status: string): Observable<CollectionRequest> {
    const statusUpdate = { status };
    return this.http.patch<CollectionRequest>(`${this.api}/${collectionRequestId}`, statusUpdate);
  }
}
