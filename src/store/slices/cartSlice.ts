import { createSlice } from "@reduxjs/toolkit";
import { RootState, CartSlice, Action } from "../types";

const initialState: CartSlice = {
    cart: JSON.parse(localStorage.getItem('cart') as string) || [],
    action: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const userCart = state.cart.filter(item => item.customerId === action.payload.customerId && item.color === action.payload.color && item.size === action.payload.size)

            if (userCart.length > 0) {
                const index = state.cart.indexOf(userCart[0])
                console.log(action.payload.quantity);
                
                state.cart[index].quantity = action.payload.quantity
            }
            else {
                state.cart.push(action.payload)
            }

            state.action = Action.ADD
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(cartItem => cartItem.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        updateCartQuantity: (state, action) => {
            2
            const cart = state.cart.find(cart => cart.id === action.payload.id)
            if (cart) cart.quantity = action.payload.quantity
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        upDateCart: (state, action) => {
            state.cart = action.payload
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        deleteCart: (state, action) => {

            const carts = state.cart.filter(cart => cart.id !== action.payload)

            state.cart = carts
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        resetCartAction: (state) => {
            state.action = null
        }
    }
})

export const { addToCart, removeFromCart, updateCartQuantity, upDateCart, deleteCart, resetCartAction } = cartSlice.actions;

export const useCart = (state: RootState) => state.cart

export default cartSlice.reducer;