import { createStore } from 'redux';
import AllProducts from "../components/products";

const initialState = {
    products: AllProducts.products,
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cart: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;