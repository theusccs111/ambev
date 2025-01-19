export default interface ProductModel {
    id: number;
    description: string;
    quantity: number; 
    unitPrice: number;
    discount: number; 
    totalAmount: number;
    isCancelled: boolean;
}
