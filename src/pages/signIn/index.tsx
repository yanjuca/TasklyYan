import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity, Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

export default function App() {
  const navigation = useNavigation();

  const [rememberMe, setRememberMe] = useState(false);
  const [erroVisivel, setErroVisivel] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setErroVisivel(true);
    } else {
      navigation.navigate("Tab");
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
        <Text style={styles.error}>{!email.trim() && ' '}</Text>

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
        />
        <Text style={styles.error}>{!senha.trim() && ' '}</Text>

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

      {/* Modal de erro */}
      <Modal visible={erroVisivel} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ops! Ocorreu um problema</Text>
            <Text style={styles.modalMessage}>E-mail e/ou senha incorretos</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErroVisivel(false)}
            >
              <Text style={styles.modalButtonText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
