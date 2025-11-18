export interface ProductResponse {
    product_Id: number;
    product_Name: string;
    quantity: number;
    price: number;
}


export interface ProductUpdateForm {
    quantity: number;
}
