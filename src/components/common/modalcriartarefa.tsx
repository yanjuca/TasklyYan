import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard, // Importar o Keyboard
} from 'react-native';

export default function ModalCriarTarefa({ visible, onClose, onCreate }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleCreate = () => {
    if (!titulo.trim() || !descricao.trim() || !prazo.trim()) {
      alert('Preencha todos os campos!');
      return;
    }
    // Validação simples para verificar se a data tem o formato completo
    if (prazo.length !== 10) {
        alert('Por favor, insira uma data de prazo válida no formato XX/XX/XXXX.');
        return;
    }

    const novaTarefa = {
      titulo,
      descricao,
      prazo, // O prazo já estará formatado aqui
    };

    onCreate(novaTarefa); // envia a tarefa pra HomeScreen
    setTitulo('');
    setDescricao('');
    setPrazo('');
    onClose();
  };

  // Função para formatar a data enquanto o usuário digita
  const formatarData = (text) => {
    // Remove tudo que não for dígito
    const numeros = text.replace(/\D/g, '');
    const tamanho = numeros.length;
    let dataFormatada = '';

    if (tamanho > 0) {
      dataFormatada = numeros.substring(0, 2); // XX
    }
    if (tamanho > 2) {
      dataFormatada += '/' + numeros.substring(2, 4); // XX/XX
    }
    if (tamanho > 4) {
      dataFormatada += '/' + numeros.substring(4, 8); // XX/XX/XXXX
    }
    // Limita ao formato XX/XX/XXXX (10 caracteres)
    setPrazo(dataFormatada.substring(0,10));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Criar tarefa</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: bater o ponto"
            style={styles.input}
            returnKeyType="next" // Ajuda na navegação entre campos
            onSubmitEditing={() => { /* Poderia focar no próximo input aqui */ }}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            multiline
            style={[styles.input, { height: 60 }]}
            placeholder="Descreva a tarefa"
          />

          <Text style={styles.label}>Prazo</Text>
          <TextInput
            value={prazo}
            onChangeText={formatarData} // <--- AQUI a mágica acontece!
            placeholder="Ex: 28/04/2025" // Ajustei para um exemplo DD/MM/AAAA
            style={styles.input}
            keyboardType="numeric" // Mostra o teclado numérico para facilitar
            maxLength={10} // Garante que não ultrapasse XX/XX/XXXX
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => {
              setTitulo(''); // Limpa os campos ao cancelar também
              setDescricao('');
              setPrazo('');
              onClose();
            }}>
              <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCreate} onPress={handleCreate}>
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
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginTop: 10,
    color: '#1E1E1E',
  },
  input: {
    borderWidth: 2,
    borderColor: '#5B3CC4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12, 
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1E1E1E',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonCancel: {
    borderColor: '#5B3CC4',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 23,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonCreate: {
    backgroundColor: '#5B3CC4',
    paddingVertical: 7,
    paddingHorizontal: 45,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#5B3CC4',
    fontFamily: 'Roboto-Medium',
    fontSize: 19,
  },
  createText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 19,
  },
});