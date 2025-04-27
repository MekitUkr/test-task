import { createSlice } from '@reduxjs/toolkit'

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    items: [],
    loading: false
  },
  reducers: {
    setRepos(state, action) {
      state.items = action.payload
    },
    updateRepo(state, action) {
      const index = state.items.findIndex(repo => repo._id === action.payload._id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    addRepo(state, action) {
      state.items.push(action.payload)
    },
    removeRepo(state, action) {
      state.items = state.items.filter(repo => repo._id !== action.payload)
    },
    setLoading(state, action) {
      state.loading = action.payload
    }
  }
})

export const { setRepos, updateRepo, addRepo, removeRepo, setLoading } = reposSlice.actions
export default reposSlice.reducer
