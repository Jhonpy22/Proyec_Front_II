// modules/profile/types/index.ts

export interface PersonalData {
  id?: string;
  fullName: string;
  accountNumber: string;
  balance: number;
  birthDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonalDataForm {
  fullName: string;
  accountNumber: string;
  balance: string;
  birthDate: string;
}

export interface SavePersonalDataRequest {
  fullName: string;
  accountNumber: string;
  balance: number;
  birthDate: string;
}

export interface SavePersonalDataResponse {
  success: boolean;
  message: string;
  data?: PersonalData;
}

export interface ValidationErrors {
  fullName?: string;
  accountNumber?: string;
  balance?: string;
  birthDate?: string;
}