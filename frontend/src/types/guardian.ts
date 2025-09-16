export interface Guardian {
  id?: number;
  email: string;
  account?: string;
  phrase: string;
  privateKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Galaxy {
  id?: number;
  recoveryAddress: string;
  guardians: Guardian[];
  createdAt?: string;
  updatedAt?: string;
}
