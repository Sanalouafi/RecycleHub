import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { SidebarComponent } from "../../layouts/sidebar/sidebar.component";
import {map, Observable} from "rxjs";
import {CollectionRequest, CollectionStatus} from "../../core/models/collection-request.model";
import { selectCollectionRequests } from "../../core/stores/collectionRequest/collection-request.reducer";
import { CollectionRequestActions } from "../../core/stores/collectionRequest/collection-request.actions";
import { Store } from "@ngrx/store";
import { AsyncPipe, NgClass, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CollectionRequestService } from "../../core/services/collection-request/collection-request.service";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    AsyncPipe,
    NgForOf,
    NgClass,
    FormsModule
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  user?: User | null;
  collectionRequests$: Observable<CollectionRequest[]>;
  collectionRequests: CollectionRequest[] = [];

  constructor(
    private store: Store,
    private collectionRequestService: CollectionRequestService
  ) {
    const userString = localStorage.getItem('user');
    let currentUser: User | null = null;
    if (userString) {
      try {
        currentUser = JSON.parse(userString);
      } catch (error) {
        console.error("Erreur lors du parsing de l'utilisateur stocké", error);
      }
    }

    this.user = currentUser;
    this.collectionRequests$ = this.store.select(selectCollectionRequests).pipe(
      map(collectionRequests =>
        collectionRequests.filter(req => req.user?.city === this.user?.city
        )
      )
    );
  }

  ngOnInit() {
    this.collectionRequests$.subscribe(requests => {
      this.collectionRequests = requests.map(request => ({
        ...request,
        status: request.status as CollectionStatus
      }));
    });

    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }

  updateStatus(originalRequest: CollectionRequest, newStatus: string) {
    if (!originalRequest.id) {
      console.error("L'ID de la requête de collection est invalide.");
      return;
    }

    const updatedRequest = { ...originalRequest, status: newStatus as CollectionStatus };

    this.collectionRequests = this.collectionRequests.map(request =>
      request.id === updatedRequest.id ? updatedRequest : request
    );

    if (updatedRequest.id !== undefined) {
      this.collectionRequestService.updateStatus(updatedRequest.id, updatedRequest.status).subscribe({
        next: (response) => {
          console.log('Statut mis à jour:', response);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
        }
      });
    } else {
      console.error("L'ID de la requête de collection est invalide.");
    }

  }
}
