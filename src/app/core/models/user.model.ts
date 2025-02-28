export enum Role {
  PARTICULAR = "PARTICULAR",
  COLLECTOR = "COLLECTOR",
}

export interface User {
  id?: number | string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  birthDate: Date;
  profilePicture: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
}
