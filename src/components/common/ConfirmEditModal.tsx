import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmEditModalProps {
    visible: boolean;
    onRequestClose: () => void;
}

const ConfirmEditModal: React.FC<ConfirmEditModalProps> = ({ visible, onRequestClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Perfil atualizado</Text>
                    <Text style={styles.modalText}>Suas informações foram salvas com sucesso.</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={onRequestClose}
                    >
                        <Text style={styles.textStyle}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#F4F4F4',
        borderRadius: 12,
        padding: 25,
    },
    modalTitle: {
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: '#1E1E1E',
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'left',
        color: '#1E1E1E',
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
    },
    button: {
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#32C25B',
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
    },
});

export default ConfirmEditModal;