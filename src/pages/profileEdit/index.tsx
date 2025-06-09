import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import getStyles from './style';
import ChevronLeftIcon from '../../assets/icons/ChevronLeft.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authService } from '../../services/authService';

const ProfileEdit: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [originalEmail, setOriginalEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);

  const isEmailValid = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPhoneNumberValid = (text: string) => {
    const phoneRegex = /^\d{2}9\d{8}$/;
    return phoneRegex.test(text);
  };

  const isFullnameValid = (text: string) => {
    return text.length > 0;
  };

  const handleBackButton = () => {
    navigation.goBack();
    console.log('Voltar pressionado');
  };

  const handleContinueButton = async () => {
    if (!isEmailValid(email) || !isFullnameValid(fullName) || !isPhoneNumberValid(phoneNumber)) {
      setIsFormValid(false);
      Alert.alert("Erro de Validação", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    setIsFormValid(true);

    try {
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        Alert.alert("Erro", "Sessão expirada. Por favor, faça login novamente.");
        navigation.reset({
            index: 0,
            routes: [{ name: 'SingIn' }],
        });
        return;
      }

      const updatedProfileData = {
        name: fullName,
        email: email,
        phone_number: phoneNumber,
      };
      await authService.updateProfile(idToken, updatedProfileData);

      await AsyncStorage.setItem("loggedUserNome", fullName);
      await AsyncStorage.setItem("loggedUserNumero", phoneNumber);
      await AsyncStorage.setItem("loggedUserEmail", email);

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      console.log("Perfil atualizado com sucesso!");

      navigation.navigate('avatarEdit' as never, {
        nomeCompleto: fullName,
        email: email,
        numero: phoneNumber,
      });

    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", error.message || "Ocorreu um erro ao atualizar o perfil. Tente novamente.");
    }
  };

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const idToken = await AsyncStorage.getItem("idToken");
        if (!idToken) {
            console.warn("ID Token não encontrado ao carregar dados do perfil.");
            return;
        }

        const userData = await authService.getProfile(idToken);
        if (userData) {
            setFullName(userData.name || '');
            setEmail(userData.email || '');
            setOriginalEmail(userData.email || '');
            setPhoneNumber(userData.phone_number || '');
        } else {
            const emailLogado = await AsyncStorage.getItem("loggedUserEmail");
            const nomeLogado = await AsyncStorage.getItem("loggedUserNome");
            const numeroLogado = await AsyncStorage.getItem("loggedUserNumero");

            setFullName(nomeLogado || '');
            setEmail(emailLogado || '');
            setOriginalEmail(emailLogado || '');
            setPhoneNumber(numeroLogado || '');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário para edição:", error);
      }
    };

    carregarDadosUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Image source={ChevronLeftIcon} style={styles.backButtonIcon} />
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.titleHead}>EDIÇÃO DE PERFIL</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Digite seu nome completo"
          placeholderTextColor={theme.textSecondary}
        />
        {(!isFormValid && !isFullnameValid(fullName)) && <Text style={styles.errorText}>Nome completo é obrigatório.</Text>}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@example.com"
          keyboardType="email-address"
          placeholderTextColor={theme.textSecondary}
        />
        {(!isFormValid && !isEmailValid(email)) && <Text style={styles.errorText}>E-mail inválido.</Text>}

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="(DDD) 9 NNNN-NNNN"
          keyboardType="phone-pad"
          maxLength={11}
          placeholderTextColor={theme.textSecondary}
        />
        {(!isFormValid && !isPhoneNumberValid(phoneNumber)) && <Text style={styles.errorText}>Número de telefone inválido (Ex: 849xxxx-xxxx).</Text>}
      </View>

      <TouchableOpacity onPress={handleContinueButton} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileEdit;