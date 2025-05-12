import React from "react"; 
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes";
import StackRouter from "./src/routes/stackRoutes";

export default function App(){
    useEffect(() => {
        console.log("Fontes (devem estar) disponíveis!");
      }, []);
    return(
        <NavigationContainer>
            <StackRouter/>            
        </NavigationContainer>
    )
}