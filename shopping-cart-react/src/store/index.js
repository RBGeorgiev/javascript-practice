import { createStore } from 'redux';
import AllProducts from "./all-products";
import saveToLocalState from './persist/save-to-local'
import loadFromLocalState from './persist/load-from-local'

const persistedState = loadFromLocalState();

const initialState = {
    products: AllProducts.products,
    cart: persistedState || []
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

store.subscribe(() => saveToLocalState(store.getState().cart));

export default store;