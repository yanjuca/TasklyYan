import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity, Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ModalErro } from '../../components/common/modalErrorSignin';

import { styles } from './style';

export default function App() {
  const [ismodalvisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !senha) {
      openModal();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      openModal();
      return;
    }

    if (senha.length < 8) {
      openModal();
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userFound = users.find(
        (user) => user.email === email && user.senha === senha
      );

      if (userFound) {
        await AsyncStorage.setItem("loggedUserEmail", userFound.email);
        await AsyncStorage.setItem("loggedUserNome", userFound.nome);
        await AsyncStorage.setItem("loggedUserNumero", userFound.numero);
        navigation.navigate("Tab");
      } else {
        openModal();
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert("Erro interno. Tente novamente.");
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
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          maxLength={8}
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.checkbox}
          >
            {rememberMe && (
              <Text style={styles.checkboxCheckmark}>✓</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.namecheck}>Lembrar de mim</Text>
        </View>

        <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
          <Text style={styles.textButtonWhite}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCriar}
          onPress={() => navigation.navigate("SingUp")}
        >
          <Text style={styles.textButtonPurple}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>

      <ModalErro visible={ismodalvisible} onClose={closeModal} />
    </KeyboardAvoidingView>
  );
}
