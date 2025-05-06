import React from "react"; 

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "../pages/signIn";
import SingUp from "../pages/signUp";
import SelectionScreen from "../pages/selectionScreen";
import avatarSelect from "../pages/avatarSelect";
import SplashScreen from "../pages/splashscreen";
import menuProfile from "../pages/menuProfile";
import WebViewPage from '../pages/webView';
import Tab from "../routes/index"
import HomePageContent from "../pages/homePageContent";

const Stack = createNativeStackNavigator();

export default function StackRouter(){
  return(    
      <Stack.Navigator>
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SingIn" component={SingIn} options={{headerShown:false}}/>
        <Stack.Screen name="Tab" component={Tab} options={{headerShown:false}}/>
        <Stack.Screen name="avatarSelect" component={avatarSelect} options={{headerShown:false}}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="menuProfile" component={menuProfile} options={{headerShown:false}}/>
        <Stack.Screen name="WebView" component={WebViewPage} />
        <Stack.Screen name="HomePageContent" component={HomePageContent} options={{headerShown:false}}/>
      </Stack.Navigator>    
  )
}