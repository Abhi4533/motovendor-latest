import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string | null;
        user: User;
      }>,
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    logout: state => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      if (!state.user) {
        state.user = {} as User;
      }
      state.user.mobile = action.payload;
    },
  },
});

export const { setAuthData, updateUser, logout, setMobile } = authSlice.actions;
export default authSlice.reducer;
