export interface CardDto {
  card_Id: number;
  user_Id: number;
  card_Type: string;
  card_Number: string;
  money: number;
  expiration_Date: string; // viene como "2027-02-13"
}

export type UpdateCardto = Partial<CardDto>;
