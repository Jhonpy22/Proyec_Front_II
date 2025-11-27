export interface Card {
  card_Id: number;
  user_Id: number;
  card_Type: string;
  card_Number: string;
  money: number;
  expiration_Date: string;
  userName?: string;
}