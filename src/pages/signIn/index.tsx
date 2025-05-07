import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './style';


export default function App() {
  
  const navigation = useNavigation();

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/imgs/frame1.png')}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          autoCorrect={false}
        />
        <Text style={styles.error}>Erro aqui</Text>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          autoCorrect={false}
        />
        <Text style={styles.error}>Erro aqui</Text>

        {/* Checkbox personalizado */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={[
              styles.checkbox,
            ]}
          >
            {rememberMe && (
              <Text style={styles.checkboxCheckmark}>✓</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.namecheck}>Lembrar de mim</Text>
        </View>

        <TouchableOpacity style={styles.buttonEntrar} onPress={() => navigation.navigate("Tab")}>
          <Text style={styles.textButtonWhite}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCriar} onPress={() => navigation.navigate("SingUp")}>
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
