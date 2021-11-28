export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  role: ROLES;
  address?: string;
  created_on?: Date;
  modified_on?: Date;
}

export enum ROLES {
  SUPERADMIN = 'Super Admin',
  ADMIN = 'Admin',
  SUBSCRIBER = 'Subscriber',
}