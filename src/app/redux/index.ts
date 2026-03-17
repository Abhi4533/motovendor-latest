import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/redux/slices/AuthSlice';
import onboardingReducer from '@app/redux/slices/onboardingSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
