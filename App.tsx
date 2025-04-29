import React from "react"; 

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "./src/pages/singIn";
import SingUp from "./src/pages/singUp";
import SelectionScreen from "./src/pages/selectionScreen";

const Stack = createNativeStackNavigator();

export default function app(){
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="SelectionScreen" component={SelectionScreen}/>
        <Stack.Screen name="SingIn" component={SingIn}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}