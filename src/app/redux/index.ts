import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/redux/slices/AuthSlice';
import onboardingReducer from '@app/redux/slices/onboardingSlice';
import { api } from './../../config/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
