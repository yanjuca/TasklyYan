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
    // 1. Validações iniciais (mantidas do seu código)
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erro', 'Login inválido');
      return;
    }
  

    setIsLoading(true); // <--- ATIVA O LOADING ANTES DE FAZER A REQUISIÇÃO

    try {
      // 2. CHAMADA À API PARA LOGIN
      // Use o authService.login que criamos!
      const response = await authService.login(email, password);

      console.log('Login bem-sucedido via API:', response);

      // A resposta da API de login é: { id_token: "...", refresh_token: "..." }
      const idToken = response.id_token;
      const refreshToken = response.refresh_token;

      // 3. SALVAR TOKENS NO ASYNCSTORAGE
      // Agora sim, vamos usar o AsyncStorage para o que ele serve para a API: guardar os tokens
      if (idToken && refreshToken) {
        await AsyncStorage.setItem('idToken', idToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        // Opcional: Se a API de `GET /profile` fosse chamada aqui,
        // você poderia pegar o nome e número diretamente do profile e salvar.
        // Por enquanto, vamos apenas salvar os tokens.
        Alert.alert('Sucesso', 'Login realizado!');
        navigation.navigate("Tab"); // Redireciona para a tela principal
      } else {
        // Isso não deve acontecer se a API responder corretamente, mas é um fallback
        Alert.alert('Erro', 'Resposta de login inválida da API.');
      }

    } catch (error: any) { // Use 'any' aqui por enquanto se não tiver tipos definidos para 'error'
      console.error("Erro ao fazer login na API:", error);
      // A mensagem de erro virá do `throw new Error(...)` que colocamos em `authService.js`
      Alert.alert("Erro no Login", error.message || "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setIsLoading(false); // <--- DESATIVA O LOADING APÓS A REQUISIÇÃO (SEJA SUCESSO OU FALHA)
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
              // Adicionar estilo para checkbox marcado aqui se quiser
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
          disabled={isLoading} // <--- DESABILITA O BOTÃO DURANTE O LOADING
        >
          <Text style={styles.textButtonWhite}>{isLoading ? 'Entrando...' : 'ENTRAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCriar} onPress={() => navigation.navigate("SingUp")}> {/* Atenção no 'SingUp' vs 'SignUp' */}
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}