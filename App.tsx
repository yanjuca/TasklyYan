import React from "react"; 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingIn from './src/pages/singin';
import SingUp from './src/pages/singUp';
import SelectionScreen from './src/pages/selectionScreen';
import SplashScreen from './src/pages/splashscreen';
import PreferencesMenu from './src/pages/preferencesMenu';
import { ThemeProvider } from './src/pages/preferencesMenu/themeContext'; 

const Stack = createNativeStackNavigator();

export default function app(){
  return(
    <ThemeProvider> 
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="SelectionScreen" component={SelectionScreen}/>
          <Stack.Screen name="SingIn" component={SingIn}/>
          <Stack.Screen name="SingUp" component={SingUp}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen}/>
          <Stack.Screen name="PreferencesMenu" component={PreferencesMenu}/>
        
        </Stack.Navigator>
     </NavigationContainer>
    </ThemeProvider> 
  )
}