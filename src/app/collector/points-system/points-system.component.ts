import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { Observable } from "rxjs";
import { CollectionRequest } from "../../core/models/collection-request.model";
import { Store } from "@ngrx/store";
import { selectCollectionRequests } from "../../core/stores/collectionRequest/collection-request.reducer";
import { CollectionRequestActions } from "../../core/stores/collectionRequest/collection-request.actions";
import { AsyncPipe, NgForOf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-points-system',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './points-system.component.html',
  styleUrls: ['./points-system.component.css']
})
export class PointsSystemComponent implements OnInit {
  collectionRequests$: Observable<(CollectionRequest & { points: number, voucher: number, remainingPoints: number })[]>;

  constructor(private store: Store) {
    this.collectionRequests$ = this.store.select(selectCollectionRequests).pipe(
      map(collections => collections
        .filter(request => request.status === 'OCCUPIED' || request.status === 'VALIDATED')
        .map(request => {
          const points = this.calculatePoints(request.items || []);
          const { voucher, pointsNeeded } = this.calculateVoucher(points);
          const remainingPoints = points - pointsNeeded;
          return {
            ...request,
            points,
            voucher,
            remainingPoints
          };
        })
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(CollectionRequestActions.getAllCollectionRequests());
  }

  private calculatePoints(items: { wasteType: string; weight: number }[]): number {
    const pointRates: { [key: string]: number } = {
      "PLASTIC": 2,
      "GLASS": 1,
      "PAPER": 1,
      "METAL": 5
    };

    return items.reduce((total, item) => {
      return total + (pointRates[item.wasteType] || 0) * item.weight;
    }, 0);
  }

  private calculateVoucher(points: number): { voucher: number, pointsNeeded: number } {
    let pointsNeeded = 0;
    let voucher = 0;

    if (points >= 500) {
      voucher = 350;
      pointsNeeded = 500;
    } else if (points >= 200) {
      voucher = 120;
      pointsNeeded = 200;
    } else if (points >= 100) {
      voucher = 50;
      pointsNeeded = 100;
    } else {
      pointsNeeded = 0;
    }

    return { voucher, pointsNeeded };
  }
}
