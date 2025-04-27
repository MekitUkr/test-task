import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  email: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
    },
    clearUser: (state) => {
      state.id = ''
      state.email = ''
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
