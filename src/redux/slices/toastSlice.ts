import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ToastState = {
  visible: boolean
  message: string
  type: 'error' | 'warning' | 'success' | 'info'
}

const initialState = {
  visible: false,
  message: '',
  type: 'error',
} as ToastState

export const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    reset: () => initialState,
    showToast: (
      state,
      action: PayloadAction<{
        message: string
        type: 'error' | 'warning' | 'success' | 'info'
      }>
    ) => {
      state.visible = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideToast: (state) => {
      state.visible = false
    },
    resetToast: (state) => {
      state.visible = false
      state.message = ''
      state.type = 'error'
    },
  },
})

export const { showToast, hideToast, resetToast } = toast.actions
export default toast.reducer
