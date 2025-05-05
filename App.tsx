import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "./src/pages/singin";
import SingUp from "./src/pages/singUp";
import SelectionScreen from "./src/pages/selectionScreen";
import avatarSelect from "./src/pages/avatarSelect";
import SplashScreen from "./src/pages/splashscreen";

import menuProfile from "./src/pages/menuProfile";
import profileEdit from "./src/pages/profileEdit";
import AvatarEdit from "./src/pages/avatarEdit";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="SelectionScreen" component={SelectionScreen}/>
        <Stack.Screen name="SingIn" component={SingIn}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
        <Stack.Screen name="avatarSelect" component={avatarSelect}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="menuProfile" component={menuProfile}/>
        <Stack.Screen name="profileEdit" component={profileEdit}/>
        <Stack.Screen name="avatarEdit" component={AvatarEdit} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}