import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

interface AccountDeletionModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const AccountDeletionModal: React.FC<AccountDeletionModalProps> = ({
    isVisible,
    onCancel,
    onConfirm,
}) => {

    const navigation = useNavigation();

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Excluir conta</Text>
                    <Text style={styles.modalText}>
                      Tem certeza que deseja excluir sua conta? Essa ação é permanente e todos os seus dados serão perdidos.
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={[styles.buttonText, styles.cancelButtonText]}>
                                Agora não
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={() => navigation.navigate("SingIn")}
                        >
                            <Text style={styles.buttonText}>EXCLUIR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
    },
    modalContent: {
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        padding: 25,
        width: '85%',
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1E1E1E',
    },
    modalText: {
        fontSize: 16,
        color: '#1E1E1E',
        textAlign: 'justify',
        marginBottom: 15,
        fontWeight: 'regular',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    cancelButton: {
        backgroundColor: '#F4F4F4',
        borderColor: '#5B3CC4',
        borderWidth: 2,
    },
    confirmButton: {
        backgroundColor: '#E63946',
        paddingHorizontal: 35,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'medium',
        fontSize: 18,
    },
    cancelButtonText: {
        color: '#5B3CC4',
    },
});

export default AccountDeletionModal;