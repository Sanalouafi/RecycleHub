import {User} from "./user.model";

export interface PointsSystem {
  id: number;
  user?: User;
  points: number;
  createdAt: Date;
  updatedAt?: Date;
}
