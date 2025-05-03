import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function modalcriarTarefa({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Criar tarefa</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput placeholder="Ex: bater o ponto" style={styles.input} />
          <Text style={styles.error}>Erro aqui</Text>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            multiline
            style={[styles.input, { height: 60 }]}
            placeholder="Ex : bater o ponto pelo site do kairos e depois tenho que sair para tomar café"
          />
          <Text style={styles.error}>Erro aqui</Text>

          <Text style={styles.label}>Prazo</Text>
          <TextInput placeholder="Ex : 04/28/2025" style={styles.input} />
          <Text style={styles.error}>Erro aqui</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCreate}>
              <Text style={styles.createText}>CRIAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonCancel: {
    borderColor: '#6200ee',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonCreate: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
