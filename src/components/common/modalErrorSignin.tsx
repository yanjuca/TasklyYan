import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ModalErroProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalErro: React.FC<ModalErroProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Ops! Ocorreu um problema</Text>
          <Text style={styles.message}>E-mail e/ou senha incorretos</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>FECHAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCriar}
            onPress={() => {
              onClose();
              navigation.navigate("SingUp");
            }}
          >
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 100,
    marginTop: -193,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: -15,
    color: '#000',
    marginRight: 85,

  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    marginRight: 105,
    fontWeight: 'bold',
    
  },
  button: {
    borderWidth: 2,
    borderColor: '#5B3CC4',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 113,
    marginBottom: 10,
    
  },
 
  
  buttonText: {
    color: '#5B3CC4',
    fontWeight: 'bold',
    fontSize: 15,
    

  },
});
