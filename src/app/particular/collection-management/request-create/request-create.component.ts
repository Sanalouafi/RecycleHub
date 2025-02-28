import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../../layouts/sidebar/sidebar.component";
import {map, Observable, take} from "rxjs";
import {CollectionRequest, CollectionStatus} from "../../../core/models/collection-request.model";
import {Store} from "@ngrx/store";
import {CollectionRequestActions} from "../../../core/stores/collectionRequest/collection-request.actions";
import {selectCollectionRequests} from "../../../core/stores/collectionRequest/collection-request.reducer";
import {NavbarComponent} from "../../../layouts/navbar/navbar.component";
import {CommonModule, NgIf} from "@angular/common";
import {AddRequestComponent} from "../add-request/add-request.component";
import {User} from "../../../core/models/user.model";

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    AddRequestComponent,
    NgIf
  ],
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit{
  user?: User | null;
  showModal = false;
  collectionRequests$: Observable<CollectionRequest[]>;
  selectedCollectionRequest: CollectionRequest | null = null;

  constructor(private store: Store) {
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
        collectionRequests.filter(req => req.user?.id === this.user?.id
        && req.status !== CollectionStatus.VALIDATED &&
          req.status !== CollectionStatus.OCCUPIED)
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());

  }
  closePopup(): void {
    console.log('close modal');
    this.showModal = false;
    this.selectedCollectionRequest = null;
  }

  openPopup() : void{
    console.log('Opening modal');
    this.showModal = true;
  }
  deleteCollectionRequest(collectionRequestId: number) {
    this.store.dispatch(CollectionRequestActions.deleteCollectionRequestById({ collectionRequestId }));
  }
  editCollectionRequest(collectionRequestId: number): void {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
    this.store.select(selectCollectionRequests).pipe(
      take(1)
    ).subscribe(collectionRequests => {
      const collectionRequest = collectionRequests.find(req => req.id === collectionRequestId);
      if (collectionRequest) {
        this.selectedCollectionRequest = collectionRequest;
        this.openPopup();
      }
    });
  }





}
