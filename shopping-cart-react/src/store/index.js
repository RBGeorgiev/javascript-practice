import { createStore } from 'redux'

const UPDATE_FILTER = 'UPDATE_FILTER';

const initialState = {
    items: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FILTER:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer)

export default store;