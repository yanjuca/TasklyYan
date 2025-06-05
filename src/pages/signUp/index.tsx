import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'; // Você já usa, manteremos para futuras funcionalidades
import { useNavigation } from "@react-navigation/native";

import { styles } from "./style";
import ModalBiometrics from "../../components/common/modalBiometrics"; // Você já usa
import { authService } from '../../services/authService'; // <--- IMPORTANTE: Adicionar essa importação

export default function SingUp() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Seus estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [password, setPassword] = useState(""); // Nome da variável local
  const [cPassword, setCPassword] = useState("");

  // Seus estados para erros de validação
  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroNumero, setErroNumero] = useState("");
  const [erroPassword, setErroPassword] = useState("");
  const [erroCPassword, setErroCPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Para alternar visibilidade da senha (original)
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false); // Para alternar visibilidade da confirmação de senha

  const [isLoading, setIsLoading] = useState(false); // <--- NOVO: Para desabilitar o botão durante a requisição

  const navigation = useNavigation();

  // Renomeando 'users' para 'handleSignUp' para clareza
  const handleSignUp = async () => {
    // Resetar erros ao iniciar uma nova tentativa
    setErroNome("");
    setErroEmail("");
    setErroNumero("");
    setErroPassword("");
    setErroCPassword("");

    let hasError = false;

    // Seus blocos de validação (mantidos e aprimorados com o que a API espera)
    if (nome.trim().split(" ").length < 2) {
      setErroNome("Digite seu nome e sobrenome");
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErroEmail("Digite um e-mail válido");
      hasError = true;
    }

    // A API espera apenas números no campo phone_number (número).
    // Seu input já usa .replace(/\D/g, '') o que é ótimo para garantir só números.
    // A validação de length < 11 é boa, mas a API pode ter sua própria.
    if (numero.replace(/\D/g, "").length < 11) {
      setErroNumero("Digite o número com o DDD (mínimo 11 dígitos)");
      hasError = true;
    }


    if (password.length < 8) {
      setErroPassword("A senha precisa ter no mínimo 8 caracteres"); // API exige mínimo 8
      hasError = true;
    } else if (password.length > 8) { // IMPORTANTE: Se a API for RÍGIDA em 8, mantenha. Se aceita mais, remova.
        // Seu TextInput tem maxLength={8}. Isso já limita a entrada do usuário.
        // Se a API aceita senhas maiores, remova o maxLength do TextInput e essa validação.
        // Por enquanto, mantenha seu maxLength=8 no TextInput para consistência.
        setErroPassword("A senha deve ter no máximo 8 caracteres");
        hasError = true;
    }


    if (password !== cPassword) {
      setErroCPassword("As senhas não coincidem!");
      hasError = true;
    }

    if (hasError) return; // Se houver qualquer erro de validação local, para aqui.

    setIsLoading(true); // <--- ATIVA O LOADING

    try {
      // -------------------------------------------------------------
      // INÍCIO DA INTEGRAÇÃO COM A API
      // -------------------------------------------------------------

      // Chama a função de registro do nosso serviço de autenticação
      const response = await authService.register(
        email,
        password, // A API espera 'password', mas passamos o valor do seu estado 'senha'
        nome,
        numero // A API espera 'phone_number', passamos o valor do seu estado 'numero'
      );

      console.log('Registro bem-sucedido via API:', response);
      // A resposta da API de registro é: { uid: "...", idToken: "..." }

      Alert.alert('Sucesso', 'Conta criada! Faça login agora.');

      // Opcional: Limpar os campos após o registro bem-sucedido
      setNome("");
      setEmail("");
      setNumero("");
      setPassword("");
      setCPassword("");

      // Navegar para a tela de login (SignIn) após o registro bem-sucedido
      // Ou para 'avatarSelect' se você quiser que o usuário vá direto para lá
      if (navigation) {
        // Se você quiser que o usuário vá para a seleção de avatar automaticamente após registro:
        // navigation.navigate("avatarSelect");

        // Ou, se for mais comum, para a tela de login:
        navigation.navigate("SignIn"); // Assumindo que sua rota de login se chama 'SignIn'
      }

      // O modal de biometria e o timeout podem ser removidos ou adaptados aqui
      // se o fluxo de registro via API não exigir isso antes do login.
      // openModal();
      // setTimeout(() => {
      //   closeModal();
      //   navigation.navigate("avatarSelect");
      // }, 1500);


      // -------------------------------------------------------------
      // FIM DA INTEGRAÇÃO COM A API
      // -------------------------------------------------------------

    } catch (error: any) { // Use 'any' para o tipo de erro, ou defina um tipo mais específico se souber.
      console.error('Erro ao registrar na API:', error);
      // A mensagem de erro virá do `throw new Error(...)` no authService.js
      Alert.alert('Erro no Registro', error.message || 'Ocorreu um erro ao tentar registrar.');
      // Se a API retornar um erro de email já cadastrado, você pode querer
      // setErroEmail('Esse e-mail já está cadastrado na API!');
      // aqui, caso a mensagem de erro padrão não seja clara o suficiente.
    } finally {
      setIsLoading(false); // <--- DESATIVA O LOADING SEMPRE
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
          keyboardType="email-address" // Boa prática
          autoCapitalize="none" // Boa prática
        />
        <Text style={styles.txterro}>{erroEmail}</Text>

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="(DDD) 9 NNNN-NNNN"
          keyboardType="numeric"
          value={numero}
          onChangeText={(text) => setNumero(text.replace(/[^0-9]/g, ''))}
          maxLength={11} // Seu código já tem isso, mantido
        />
        <Text style={styles.txterro}>{erroNumero}</Text>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="* * * * * * * *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // Use isSenhaVisible para o primeiro campo de senha
          maxLength={8} // Seu código já tem isso, mantido. Cuidado com a API.
        />
        <Text style={styles.txterro}>{erroPassword}</Text>

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.txtinput}
          placeholder="* * * * * * * *"
          value={cPassword}
          onChangeText={setCPassword}
          secureTextEntry={!isCPasswordVisible}
          maxLength={8} // Seu código já tem isso, mantido.
        />
        <TouchableOpacity onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}>
          <Text>{isCPasswordVisible ? "Ocultar senha" : "Ver senha"}</Text>
        </TouchableOpacity>
        <Text style={styles.txterro}>{erroCPassword}</Text>

        <TouchableOpacity
          style={styles.btn} // Seu estilo para o botão
          onPress={handleSignUp} // <--- CHAMA A NOVA FUNÇÃO
          disabled={isLoading} // <--- DESABILITA O BOTÃO ENQUANTO CARREGA
        >
          <Text style={styles.txtbtn}>{isLoading ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}</Text>
        </TouchableOpacity>

        {/* Mantenha o modal se ele for relevante para o fluxo de UX atual */}
        <ModalBiometrics visible={isModalVisible} onClose={closeModal} />
      </View>
    </View>
  );
}