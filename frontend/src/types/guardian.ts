export interface Guardian {
  id: number;
  email: string;
  account: string;
  phrase: string;
  privateKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface Galaxy {
  id: number;
  name: string;
  recoveryAddress: string;
  guardians: Guardian[];
}
