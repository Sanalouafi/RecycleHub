import {CollectionRequest} from "./collection-request.model";

export enum ItemType {
  PLASTIC = "PLASTIC",
  GLASS = "GLASS",
  PAPER = "PAPER",
  METAL = "METAL",
}

export interface RequestItem {
  id: number;
  //requestId: CollectionRequest;
  wasteType: ItemType;
  weight: number;
  //createdAt: Date;
}
