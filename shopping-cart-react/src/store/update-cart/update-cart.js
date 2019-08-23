export const updateCart = (cartItems) => {
    return {
        type: 'UPDATE_CART',
        payload: cartItems
    }
}