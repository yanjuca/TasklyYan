import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./style";
import ModalBiometrics from "../../components/common/modalBiometrics";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingUp() {
    const [isModalVisible, setIsmodalVisible] = useState(false);
    const openModal = () => setIsmodalVisible(true);
    const closeModal = () => setIsmodalVisible(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [senha, setSenha] = useState("");
    const [cSenha, setCSenha] = useState("");

    const [erroNome, setErroNome] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroNumero, setErroNumero] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroCSenha, setErroCSenha] = useState("");

    const users = async () => {
        let hasError = false;

        if (nome.trim().split(" ").length < 2) {
            setErroNome("Digite seu nome e o sobrenome");
            hasError = true;
        } else {
            setErroNome("");
            hasError = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErroEmail('Digite um e-mail válido');
            hasError = true;
        } else {
            setErroEmail("");
        }

        if (numero.replace(/\D/g, "").length < 11) {
            setErroNumero("Digite o número com o DDD");
            hasError = true;
        } else {
            setErroNumero("");
        }

        if (senha.length < 8) {
            setErroSenha('A senha precisa ter no mínimo 8 caracteres');
            hasError = true;
        } else {
            setErroSenha("");
        }

        if (senha !== cSenha) {
            setErroCSenha("As senhas não coincidem!");
            hasError = true;
        } else {
            setErroCSenha("");
        }

        if (hasError) {
            return;
        }

        const newUser = {
            id: Date.now(),
            nome,
            email,
            numero,
            senha,
        };

        try {
            const storedUsers = await AsyncStorage.getItem('users');
            const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
            const updatedUsers = [...parsedUsers, newUser];
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            openModal();
            console.log(updatedUsers);
            setNome('');
            setEmail('');
            setNumero('');
            setSenha('');
            setCSenha('');
        } catch (error) {
            Alert.alert("Erro ao salvar dados!");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cont}>
                <Text style={styles.txth1}>CADASTRO</Text>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 5 }}>Nome Completo</Text>
                <TextInput
                    style={styles.txtinput}
                    placeholder="Ex: João Gabriel"
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={styles.txterro}>{erroNome} </Text>

                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 5 }}>E-mail</Text>
                <TextInput
                    style={styles.txtinput}
                    placeholder="example@example.com"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.txterro}>{erroEmail} </Text>

                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 5 }}>Número</Text>
                <TextInput
                    style={styles.txtinput}
                    maxLength={11}
                    placeholder="(DDD) 9 NNNN-NNNN"
                    value={numero}
                    onChangeText={setNumero}
                />
                <Text style={styles.txterro}>{erroNumero} </Text>

                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 5 }}>Senha</Text>
                <TextInput
                    style={styles.txtinput}
                    maxLength={8}
                    placeholder="* * * * * * * *"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
                <Text style={styles.txterro}>{erroSenha} </Text>

                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, marginBottom: 5 }}>Confirmar Senha</Text>
                <TextInput
                    style={styles.txtinput}
                    maxLength={8}
                    placeholder="* * * * * * * *"
                    value={cSenha}
                    onChangeText={setCSenha}
                    secureTextEntry={true}
                />
                <Text style={styles.txterro}>{erroCSenha} </Text>

                <TouchableOpacity style={styles.btn} onPress={users}>
                    <Text style={styles.txtbtn}> CRIAR CONTA</Text>
                    <ModalBiometrics visible={isModalVisible} onClose={closeModal} />
                </TouchableOpacity>
            </View>
        </View>
    );
}