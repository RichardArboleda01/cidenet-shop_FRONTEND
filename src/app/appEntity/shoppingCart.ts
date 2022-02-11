import { Product } from 'src/app/product';
export class ShoppingCart {

    idCart: number = 0;
    subtotal: number = 0;
    discount: number = 0;
    delivery: number = 0;
    total: number = 0;
    cartProduct: Product[] = [];

}