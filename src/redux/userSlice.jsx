import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated:false,
  user:null,
  token:null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    isLoginSucces:(state,action)=>{
        state.isAuthenticated=true;
        state.token=action.payload;
        return state;
    },
    isLogoutSuccess:(state,action)=>{
      return initialState;
    },
    updateProfile:(state,action)=>{
      state.user=action.payload;
      return state;
    }
  },
})

// Action creators are generated for each case reducer function
export const {isLoginSucces,isLogoutSuccess,updateProfile } = counterSlice.actions

export default counterSlice.reducer