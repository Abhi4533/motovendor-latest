import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './Splashscreen';
import Login from './Login';
import Signup from './Signup';
import Registeration from '@modules/user/onboarding/Registeration';
import { AUTH_ROUTES } from '@navigation/routes';
import { AuthStackParamList } from '@navigation/types';
import Authority from '@modules/user/onboarding/Authority';
import AuthorityAdd from '@modules/user/onboarding/AuthorityAdd';
import LegalDocuments from '@modules/user/onboarding/LegalDocuments';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AUTH_ROUTES.SPLASH} component={Splashscreen} />
      <Stack.Screen name={AUTH_ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={AUTH_ROUTES.SIGNUP} component={Signup} />
      <Stack.Screen name={AUTH_ROUTES.REGISTRATION} component={Registeration} />
      <Stack.Screen name={AUTH_ROUTES.AUTHORITY} component={Authority} />
      <Stack.Screen name={AUTH_ROUTES.AUTHORITYADD} component={AuthorityAdd} />
      <Stack.Screen
        name={AUTH_ROUTES.LEGALDOCUMENTS}
        component={LegalDocuments}
      />
    </Stack.Navigator>
  );
}
