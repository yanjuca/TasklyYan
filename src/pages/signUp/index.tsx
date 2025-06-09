import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Mantenha, vamos usá-lo!
import { useNavigation } from "@react-navigation/native";

import { styles } from "./style";
import ModalBiometrics from "../../components/common/modalBiometrics";
import { authService } from '../../services/authService';

export default function SingUp() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroNumero, setErroNumero] = useState("");
  const [erroPassword, setErroPassword] = useState("");
  const [erroCPassword, setErroCPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    setErroNome("");
    setErroEmail("");
    setErroNumero("");
    setErroPassword("");
    setErroCPassword("");

    let hasError = false;

    // --- Validações ---
    if (nome.trim().split(" ").length < 2) {
      setErroNome("Digite seu nome e sobrenome");
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErroEmail("Digite um e-mail válido");
      hasError = true;
    }

    // Apenas dígitos, com 11 caracteres (DDD + 9 + 8 dígitos)
    if (numero.replace(/\D/g, "").length !== 11) {
      setErroNumero("Digite o número com o DDD (ex: 849xxxxxxxx)");
      hasError = true;
    }

    // CORREÇÃO: Lógica de validação de senha
    if (password.length < 8) {
      setErroPassword("A senha precisa ter no mínimo 8 caracteres");
      hasError = true;
    }

    if (password !== cPassword) {
      setErroCPassword("As senhas não coincidem!");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const registerResponse = await authService.register(
        email,
        password,
        nome,
        numero
      );

      console.log('Registro bem-sucedido via API:', registerResponse);

      const registeredUserId = registerResponse.uid;

      const loginResponse = await authService.login(email, password);
      console.log('Login automático bem-sucedido após registro:', loginResponse);

      await AsyncStorage.setItem('idToken', loginResponse.id_token);
      await AsyncStorage.setItem('refreshToken', loginResponse.refresh_token);

      if (loginResponse.user) {
        await AsyncStorage.setItem('loggedUserNome', loginResponse.user.name);
        await AsyncStorage.setItem('loggedUserEmail', loginResponse.user.email);
        if (loginResponse.user.phone_number) {
            await AsyncStorage.setItem('loggedUserNumero', loginResponse.user.phone_number);
        }
        await AsyncStorage.setItem('loggedUserId', loginResponse.user.id); // Guardar o ID do usuário
      } else {
        await AsyncStorage.setItem('loggedUserNome', nome);
        await AsyncStorage.setItem('loggedUserEmail', email);
        await AsyncStorage.setItem('loggedUserNumero', numero);
        await AsyncStorage.setItem('loggedUserId', registeredUserId);
      }


      Alert.alert(
        'Sucesso',
        'Conta criada e você está logado! Agora, selecione seu avatar.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (navigation) {
                navigation.replace("AvatarSelectionScreen" as never, {
                  userId: registeredUserId,
                  idToken: loginResponse.id_token,
                });
              }
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Erro ao registrar ou logar automaticamente:', error);
      Alert.alert('Erro no Registro/Login', error.message || 'Ocorreu um erro ao tentar criar a conta ou logar automaticamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.txth1}>CADASTRO</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="Ex: João Gabriel"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.txterro}>{erroNome}</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.txterro}>{erroEmail}</Text>

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="(DDD) 9 NNNN-NNNN"
          keyboardType="numeric"
          value={numero}
          onChangeText={(text) => setNumero(text.replace(/[^0-9]/g, ''))}
          maxLength={11}
        />
        <Text style={styles.txterro}>{erroNumero}</Text>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="* * * * * * * *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          maxLength={8} // Mantenha se a senha deve ter EXATAMENTE 8. Se for MÍNIMO 8, remova este maxLength e ajuste a validação.
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Text>{isPasswordVisible ? "Ocultar senha" : "Ver senha"}</Text>
        </TouchableOpacity>
        <Text style={styles.txterro}>{erroPassword}</Text>

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="* * * * * * * *"
          value={cPassword}
          onChangeText={setCPassword}
          secureTextEntry={!isCPasswordVisible}
          maxLength={8} // Mantenha se a senha deve ter EXATAMENTE 8. Se for MÍNIMO 8, remova este maxLength e ajuste a validação.
        />
        <TouchableOpacity onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}>
          <Text>{isCPasswordVisible ? "Ocultar senha" : "Ver senha"}</Text>
        </TouchableOpacity>
        <Text style={styles.txterro}>{erroCPassword}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.txtbtn}>
            {isLoading ? <ActivityIndicator color="#fff" /> : 'CRIAR CONTA'}
          </Text>
        </TouchableOpacity>

        <ModalBiometrics visible={isModalVisible} onClose={closeModal} />
      </View>
    </View>
  );
}