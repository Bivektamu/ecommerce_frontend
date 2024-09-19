import { createSlice } from "@reduxjs/toolkit";
import { RootState, CartSlice } from "../types";

const initialState: CartSlice = {
    cart: JSON.parse(localStorage.getItem('cart') as string) || []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
            console.log('sdf');
            
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(cartItem => cartItem.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export const useCart = (state:RootState) => state.cart

export default cartSlice.reducer;