import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

import ChevronLeftIcon from '../../assets/icons/ChevronLeft.png';


const ProfileEdit: React.FC = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleBackButton = () => {
        navigation.goBack();
        console.log('Voltar pressionado');
    };

    const handleContinueButton = () => {
        console.log('Continuar pressionado');
        validateForm();
        if (!fullNameError && !emailError && !phoneNumberError) {
            console.log('Dados do formulário: ', {fullName, email, phoneNumber});
        }
    };

    const validateForm = () => {
        setFullNameError(fullName.trim() === '' ? 'Nome Completo é obrigatório' : '');
        setEmailError(!isValidEmail(email) ? 'E-mail inválido' : '');
        setPhoneNumberError(!isValidPhoneNumber(phoneNumber) ? 'Número de telefone inválido' : '');
    };

    const isValidEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };

    const isValidPhoneNumber = (text: string) => {
        const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
        return phoneRegex.test(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                    <Image source={ChevronLeftIcon} style={styles.backButtonIcon}/>
                    <Text style={styles.backButtonText}>VOLTAR</Text>
                </TouchableOpacity>
                <Text style={styles.title}>EDIÇÃO DE PERFIL</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Digite seu nome completo"
                />
                {fullNameError && <Text style={styles.errorText}>{fullNameError}</Text>}

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@example.com"
                    keyboardType="email-address"
                />
                {emailError && <Text style={styles.errorText}>{emailError}</Text>}

                <Text style={styles.label}>Número</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="(DDD) 9 NNNN-NNNN"
                    keyboardType="phone-pad"
                />
                {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}
        </View>

        <TouchableOpacity onPress={handleContinueButton} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUAR</Text>
        </TouchableOpacity>
        </View>
    );
};

export default ProfileEdit;