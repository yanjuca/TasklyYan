import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/authService';

import { useNavigation } from '@react-navigation/native';

import { styles } from './style';


export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erro', 'Login inválido');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Erro', 'Login inválido');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(email, password);

      console.log('Login bem-sucedido via API:', response);

      const idToken = response.id_token;
      const refreshToken = response.refresh_token;

      if (idToken && refreshToken) {
        await AsyncStorage.setItem('idToken', idToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        Alert.alert('Sucesso', 'Login realizado!');
        navigation.navigate("Tab");
      } else {
        Alert.alert('Erro', 'Resposta de login inválida da API.');
      }

    } catch (error: any) {
      console.error("Erro ao fazer login na API:", error);
      Alert.alert("Erro no Login", error.message || "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={!isCPasswordVisible}
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}>
          <Text>Ver Senha</Text>
        </TouchableOpacity>


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

        <TouchableOpacity
          style={styles.buttonEntrar}
          onPress={handleLogin}
          disabled={isLoading} 
        >
          <Text style={styles.textButtonWhite}>{isLoading ? '...' : 'ENTRAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCriar} onPress={() => navigation.navigate("SingUp")}> 
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}