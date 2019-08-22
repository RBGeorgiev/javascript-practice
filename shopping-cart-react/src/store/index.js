import { createStore } from 'redux';
import AllProducts from "../components/products";

const initialState = {
    products: AllProducts.products,
    filters: [],
    cart: [],
    order: 'default'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return {
                ...state,
                filters: action.payload
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cart: action.payload
            };
        case 'UPDATE_ORDER':
            return {
                ...state,
                order: action.payload
            };
        case 'FILTER_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;