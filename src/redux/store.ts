import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import toastSlice from './slices/toastSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    counterSlice,
    toastSlice,
    cartSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
