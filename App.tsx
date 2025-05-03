import React from "react"; 
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes";
import StackRouter from "./src/routes/stackRoutes";

export default function App(){
    return(
        <NavigationContainer>
            <StackRouter/>            
        </NavigationContainer>
    )
}