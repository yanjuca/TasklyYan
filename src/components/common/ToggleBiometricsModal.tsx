import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BiometricToggleModalProps {
    isVisible: boolean;
    isBiometricEnabled: boolean;
    onCancel: () => void;
    onConfirm: (newState: boolean) => void;
}

const BiometricToggleModal: React.FC<BiometricToggleModalProps> = ({
    isVisible,
    isBiometricEnabled,
    onCancel,
    onConfirm,
}) => {
    const modalTitle = isBiometricEnabled ? "Desativar Biometria?" : "Ativar Biometria?";
    const modalText = isBiometricEnabled
        ? "Tem certeza que deseja desabilitar a autenticação por biometria? Você precisará usar seu login e senha para acessar o app."
        : "Deseja ativar a autenticação por biometria? Isso permitirá um acesso mais rápido e seguro ao app.";
    const confirmButtonText = isBiometricEnabled ? "DESABILITAR" : "HABILITAR";
    const confirmButtonColor = isBiometricEnabled ? styles.deactivateButton : styles.activateButton;

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <Text style={styles.modalText}>{modalText}</Text>
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
                            style={[styles.button, confirmButtonColor]}
                            onPress={() => onConfirm(!isBiometricEnabled)}
                        >
                            <Text style={styles.buttonText}>{confirmButtonText}</Text>
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
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    cancelButton: {
        backgroundColor: '#F4F4F4',
        borderColor: '#5B3CC4',
        borderWidth: 2,
    },
    activateButton: {
        backgroundColor: '#32C25B', // Cor verde para ativar
        paddingHorizontal: 30,
    },
    deactivateButton: {
        backgroundColor: '#E63946', // Cor vermelha para desativar
        paddingHorizontal: 20,
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

export default BiometricToggleModal;