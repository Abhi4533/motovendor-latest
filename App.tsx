import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import store from '@app/redux/index';
import { darkTheme, lightTheme } from '@utils/colors';
import RootNavigator from '@navigation/RootNavigator';
import i18n from '@translation/i18n';

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
