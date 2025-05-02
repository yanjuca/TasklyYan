import React , {useState} from "react";
import { View,Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./style";
import ModalBiometrics from "../../components/common/modalBiometrics"



export default function SingUp (){

    const [ isModalVisible, setIsmodalVisible] = useState(false)
    const openModal = () => setIsmodalVisible(true)
    const closeModal = () => setIsmodalVisible(false)


    return(
        <View style={styles.container}>
            <View style={styles.cont}>
                

                <Text style={styles.txth1}>CADASTRO</Text>
                <Text>Nome Completo</Text>
                <TextInput style={styles.txtinput} placeholder="Ex: João Gabriel"></TextInput>
                <Text style={styles.txterro}>Erro aqui</Text>

                <Text>E-mail</Text>
                <TextInput style={styles.txtinput} placeholder="example@example.com"></TextInput>
                <Text style={styles.txterro}>Erro aqui</Text>

                <Text>Número</Text>
                <TextInput style={styles.txtinput} placeholder="(DDD) 9 NNNN-NNNN"></TextInput>
                <Text style={styles.txterro}>Erro aqui</Text>

                <Text>Senha</Text>
                <TextInput style={styles.txtinput} placeholder="* * * * * * * *"></TextInput>
                <Text style={styles.txterro}>Erro aqui</Text>

                <Text>Confirmar Senha</Text>
                <TextInput style={styles.txtinput} placeholder="* * * * * * * *"></TextInput>
                <Text style={styles.txterro}>Erro aqui</Text>
                
                <TouchableOpacity style={styles.btn} onPress={openModal}>
                    <Text style={styles.txtbtn}> CRIAR CONTA</Text>
                    <ModalBiometrics visible={isModalVisible} onClose={closeModal} />
                </TouchableOpacity>

            </View> 
        </View>
    )
}