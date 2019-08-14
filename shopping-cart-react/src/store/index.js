import { createStore } from 'redux'

const initialState = {
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
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;