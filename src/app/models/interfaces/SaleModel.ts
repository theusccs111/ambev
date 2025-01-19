import ProductModel from "./ProductModel";

export default interface SaleModel {
    id: number; 
    saleNumber: number;
    saleDate: Date;
    customerName: string; 
    totalSaleAmount: number; 
    branch: string; 
    
    products: ProductModel[]; 
}
