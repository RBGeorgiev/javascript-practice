export const updateCart = (cartItems) => {
    return {
        type: 'ADD_TO_CART',
        payload: cartItems
    }
}