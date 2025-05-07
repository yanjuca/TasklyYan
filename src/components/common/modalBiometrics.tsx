import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const ModalComponent = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTexth1}>Ative o Desbloqueio por Biometria</Text>
          <Text style={styles.modalText}>Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar sua senha sempre que quiser.</Text>
          <View style={styles.btn}>
            <Pressable style={styles.btnCancel}  onPress={onClose}><Text style={styles.txtCanel}>Agora não</Text></Pressable>
            <Pressable style={styles.btnNext} onPress={onClose}><Text style={styles.txtactivate}>ATIVAR</Text></Pressable>
          </View>         
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTexth1:{
    fontSize:18,
    fontFamily: 'Roboto-Medium',
    marginBottom:15
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
  },
  btn:{
    flexDirection:"row",
    justifyContent:"space-around",
  },
  btnCancel:{
    paddingHorizontal:25,
    paddingVertical:7,
    borderRadius:8,
    borderWidth:2,
    borderColor:"#5b3cc4",
  },
  txtCanel:{
    color:"#5b3cc4",
    fontWeight:"500",
    fontSize:18,
  },
  btnNext:{
    paddingHorizontal:45,
    paddingVertical:7,
    borderRadius:8,
    backgroundColor:"#5b3cc4"
  },
  txtactivate:{
    color:"white",
    fontWeight:"500",
    fontSize:18
  }
});

export default ModalComponent;
