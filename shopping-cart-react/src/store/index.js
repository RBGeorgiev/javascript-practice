import { createStore } from 'redux'

const initialState = {
    filters: [],
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return {
                ...state,
                filters: action.payload
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;