import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Você pode precisar remover isso se não estiver usando-o para armazenamento pós-login imediato.
import { useNavigation } from "@react-navigation/native";

import { styles } from "./style";
import ModalBiometrics from "../../components/common/modalBiometrics"; // Certifique-se que o caminho está correto
import { authService } from '../../services/authService'; // Certifique-se que o caminho está correto

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

    if (nome.trim().split(" ").length < 2) {
      setErroNome("Digite seu nome e sobrenome");
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErroEmail("Digite um e-mail válido");
      hasError = true;
    }

    if (numero.replace(/\D/g, "").length < 11) {
      setErroNumero("Digite o número com o DDD (mínimo 11 dígitos)");
      hasError = true;
    }

    if (password.length < 8) {
      setErroPassword("A senha precisa ter no mínimo 8 caracteres");
      hasError = true;
    } else if (password.length > 8) {
      setErroPassword("A senha deve ter no máximo 8 caracteres");
      hasError = true;
    }

    if (password !== cPassword) {
      setErroCPassword("As senhas não coincidem!");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const response = await authService.register(
        email,
        password,
        nome,
        numero
      );

      console.log('Registro bem-sucedido via API:', response);
      Alert.alert(
        'Sucesso',
        'Conta criada! Agora, selecione seu avatar.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (navigation) {
                // CORREÇÃO AQUI: USAR response.uid em vez de response.user.id
                navigation.navigate("AvatarSelectionScreen" as never, {
                  userId: response.uid, // O 'uid' está no nível superior da resposta do seu backend
                  idToken: response.idToken,
                });
              }
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Erro ao registrar na API:', error);
      Alert.alert('Erro no Registro', error.message || 'Ocorreu um erro ao tentar registrar.');
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
          maxLength={8}
        />
        <Text style={styles.txterro}>{erroPassword}</Text>

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="* * * * * * * *"
          value={cPassword}
          onChangeText={setCPassword}
          secureTextEntry={!isCPasswordVisible}
          maxLength={8}
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