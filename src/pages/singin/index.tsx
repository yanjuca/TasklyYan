import React from "react";
import { View,Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function SingIn (){
    const navigation = useNavigation();

    return(
        <View>
            <Text>
                tela login
                <Button title="SingUp"></Button>
            </Text>
        </View>
    )
}