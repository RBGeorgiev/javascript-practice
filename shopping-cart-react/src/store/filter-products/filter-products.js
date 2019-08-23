import AllProducts from "../all-products";
import filterSizes from "./filter-sizes";
import sortByPrice from './sort-by-price';

export const filterProducts = (size, order, products = AllProducts.products) => {
    products = filterSizes(products, size);
    products = sortByPrice(products, order);

    return {
        type: 'FILTER_PRODUCTS',
        payload: products
    }
}