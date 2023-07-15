import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import MainStack from "./navigation/MainStack";
import { store } from "./store";
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { Provider as PaperProvider , MD3LightTheme as DefaultTheme } from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainStack />
          {/* {auth.user?.user ? <UserStack /> : <AuthStack />} */}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
