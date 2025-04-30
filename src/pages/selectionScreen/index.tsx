import React from "react";
import { View,Text, Button, ScrollView, StyleSheet,TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function SelectionScreen (){
    const navigation = useNavigation();

    return(
            <View style={styles.container}>                
                    <Button title="SingIn" onPress={() => navigation.navigate("SingIn")}></Button>
                    <Button title="SingUp" onPress={() => navigation.navigate("SingUp")}></Button>
                    <Button title="SingUp" onPress={() => navigation.navigate("SingUp")}></Button>
            </View>        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
<<<<<<< HEAD
      justifyContent: 'center',
      alignItems: 'center',     
=======
      justifyContent: 'center',  
      alignItems: 'center',      
>>>>>>> feature/tela-cadastro
    },
  });