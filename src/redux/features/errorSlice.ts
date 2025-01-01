import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ErrorMassage = {
  title: string
  message: string
}

type ErrorState = {
  error: ErrorMassage | null
}

const initialState: ErrorState = {
  error: null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorMassage>) => {
      state.error = action.payload
    },
    removeError: (state) => {
      state.error = null
    },
  },
})

// Get State
export const getError = (state: ErrorState) => state.error

// Action and Reducer
export const { setError, removeError } = errorSlice.actions
export default errorSlice.reducer
