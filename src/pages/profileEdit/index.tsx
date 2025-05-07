import { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

import ChevronLeftIcon from '../../assets/icons/ChevronLeft.png';

import avatarEdit from '../avatarEdit';

const ProfileEdit: React.FC = () => {
    const navigation = useNavigation();
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
    const isFullnameValid = (text: string) =>{
        return text.length > 0;
    };

    const handleBackButton = () => {
        navigation.goBack();
        console.log('Voltar pressionado');
    };

    const handleContinueButton = () => {  

        if (isEmailValid(email) && isFullnameValid(fullName) && isPhoneNumberValid(phoneNumber)) {
          console.log('Validação passou, navegando...');
          console.log('Dados do formulário: ', { fullName, email, phoneNumber });
          navigation.navigate('avatarEdit', {
            nomeCompleto: fullName,
            email: email,
            numero: phoneNumber,
          });
          setIsFormValid(true); // Reset o estado para o próximo envio
        } else {
          setIsFormValid(false); // Atualiza o estado para exibir as mensagens de erro
          console.log('Validação falhou, não navegando.');
        }
      };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                    <Image source={ChevronLeftIcon} style={styles.backButtonIcon}/>
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
                    />
                { (!isFormValid && !isFullnameValid(fullName) ) && <Text style={styles.errorText}>Error aqui</Text>}

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@example.com"
                    keyboardType="email-address"
                    />
                {(!isFormValid && !isEmailValid(email)) && <Text style={styles.errorText}>Error aqui</Text>}

                <Text style={styles.label}>Número</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="(DDD) 9 NNNN-NNNN"
                    keyboardType="phone-pad"
                    />
                {(!isFormValid && !isPhoneNumberValid(phoneNumber)) && <Text style={styles.errorText}>Error aqui</Text>}

            </View>

            <TouchableOpacity onPress={handleContinueButton}  style={styles.continueButton}>
                <Text style={styles.continueButtonText}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileEdit;