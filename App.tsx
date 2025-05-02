import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SingUp from "./src/pages/signUp";
import SingIn from "./src/pages/signIn";

const Tab = createBottomTabNavigator();


export default function Routes(){
    return(
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="SingUp"
              component={SingUp}
            />
            <Tab.Screen 
              name="SingIn"
              component={SingIn}
            />
          </Tab.Navigator>
        </NavigationContainer>
    )
}