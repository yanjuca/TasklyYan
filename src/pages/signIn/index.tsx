import React, { useState } from 'react';
import {
  Text, View, Image, TextInput,
  KeyboardAvoidingView, TouchableOpacity
} from 'react-native';

import { styles } from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa'; // <== Adicione isso

export default function App() {
  const [modalVisible, setModalVisible] = useState(false); // <== controle do modal

  return (
    <KeyboardAvoidingView style={styles.background}>
      {/* Modal visível */}
      <ModalCriarTarefa visible={modalVisible} onClose={() => setModalVisible(false)} />

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
          onPress={() => setModalVisible(true)} // <== abre o modal
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
