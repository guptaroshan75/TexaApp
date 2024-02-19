import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/Screen/AppNavigator';
import LoginScreenNavigator from './src/Screen/LoginScreenNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  const checkTokenAndNavigate = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      setIsLogged(!!userToken);
    } catch (error) {
      console.error('Error retrieving token:', error);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    checkTokenAndNavigate();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  })

  return (
    <ToastProvider successIcon={<AntDesign name={'checkcircleo'} size={25} color="#aaa" />}
      placement="top" duration={5000} offsetTop={30}
    >
      <Provider store={Store}>
        <NavigationContainer>
          {/* <LoginScreenNavigator /> */}
          {isLogged ? <AppNavigator /> : <LoginScreenNavigator />}
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}

export default App;
