import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity
} from 'react-native';

import { styles } from './style';


export default function App() {
  
  return (
    <KeyboardAvoidingView style={styles.background}>
      {/* Modal visível */}
      

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

        <Text style={styles.namecheck}>Lembrar de mim</Text>

        <TouchableOpacity
          style={styles.buttonEntrar}
        >
          <Text style={styles.textButtonWhite}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCriar}>
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
