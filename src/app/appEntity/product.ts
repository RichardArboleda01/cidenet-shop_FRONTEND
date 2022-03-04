export class Product {

    idProduct: number = 0;
    category: String = "";
    name: String = "";
    price:  number = 0;
    description: String = "";
    picture: any;
    idColor: ProductColor[] = [];
    brand: String = "";
    size: String = "";
    units: number = 0;
    stock: number = 0; 

}

export class ProductColor {

    idColor: number = 0;
    nameColor: String = "";
  
}



