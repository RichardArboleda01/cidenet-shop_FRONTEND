import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Given an array of products and a search term, return a new array of products that match the search
   * term
   * @param {any} value - the array of products that we are filtering
   * @param {any} arg - the argument passed into the pipe.
   * @returns An array of products that match the search term.
   */
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultProducts= [];
    for (const product of value) {
      if(product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProducts.push(product);
      }
    }
    return resultProducts;
  }

}
