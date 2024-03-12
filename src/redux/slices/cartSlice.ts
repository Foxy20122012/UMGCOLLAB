
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItemProduct {
  productId: string
  cartItemId: string
}

type CartState = {
  cartItems: CartItemProduct[]
}

const initialState = {
  cartItems: []
} as CartState

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: () => initialState,
    setCart: (
      state,
      action: PayloadAction<{
        cartItems: CartItemProduct[]
      }>
    ) => {
      state.cartItems = action.payload.cartItems
    },
    addToCart: (
      state,
      action: PayloadAction<{
        cartItem: CartItemProduct
      }>
    ) => {
      state.cartItems.push(action.payload.cartItem)
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string
      }>
    ) => {
      let _cartItems = state.cartItems.filter((item) => item.productId !== action.payload.productId)

      state.cartItems = _cartItems
    },
    resetCart: (state) => {
      state.cartItems = initialState.cartItems
    },
  },
})

export const { addToCart, removeFromCart, resetCart, setCart } = cart.actions
export default cart.reducer
