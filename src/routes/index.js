import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottonTabNavigator } from "@react-navigate/bottom-tabs";

import SingUp from "../pages/signUp";

const tab = createBottonTabNavigator


export default function Routes(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={SingUp}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}