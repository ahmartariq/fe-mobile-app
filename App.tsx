import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import MainStack from "./navigation/MainStack";
import { store } from "./store";
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { Provider as PaperProvider , MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetModalProvider>

    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainStack />
          {/* {auth.user?.user ? <UserStack /> : <AuthStack />} */}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
