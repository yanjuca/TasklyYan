import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from '../../pages/preferencesMenu/themeContext';

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
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(17, 24, 39, 0.7)',
    },
    modalContent: {
      backgroundColor: theme.secondaryBg,
      borderRadius: 12,
      padding: 25,
      width: '85%',
      alignItems: 'flex-start',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Roboto-Medium',
      marginBottom: 8,
      color: theme.mainText,
    },
    modalText: {
      fontSize: 16,
      color: theme.mainText,
      textAlign: 'justify',
      marginBottom: 15,
      fontFamily: 'Roboto-Regular',
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
      backgroundColor: theme.secondaryBg, 
      borderColor: theme.primary,
      borderWidth: 2,
    },
    confirmButton: {
      backgroundColor: theme.error, 
      paddingHorizontal: 35,
    },
    buttonText: {
      color: theme.secondaryBg, 
      fontFamily: 'Roboto-Medium',
      fontSize: 18,
    },
    cancelButtonText: {
      color: theme.primary, 
      fontFamily: 'Roboto-Medium',
    },
  });

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
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>EXCLUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountDeletionModal;
