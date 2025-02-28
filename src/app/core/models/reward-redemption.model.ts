import {User} from "./user";

export interface RewardRedemption {
  id: number;
  user?: User;
  pointsUsed: number;
  voucherAmount: number;
  redeemedAt: Date;
  createdAt: Date;
}
