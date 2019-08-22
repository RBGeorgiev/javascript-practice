import AllProducts from "../components/products";
import filterSizes from "../components/filter-sizes";
import sortByPrice from '../components/sort-by-price';

export const filterProducts = (size, order, products = AllProducts.products) => {
    products = filterSizes(products, size);
    products = sortByPrice(products, order);

    return {
        type: 'FILTER_PRODUCTS',
        payload: products
    }
}