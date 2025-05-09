import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default function HomeScreen() {

  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const salvarTarefas = async (dados, email) => {
    try {
      await AsyncStorage.setItem(`tarefas_${email}`, JSON.stringify(dados));
    } catch (error) {
      Alert.alert("Erro ao salvar tarefas", error.message);
    }
  };

  const carregarTarefas = async (email) => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(`tarefas_${email}`);
      if (dadosSalvos) {
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (erro) {
      console.log('Erro ao carregar tarefas:', erro);
    }
  };

  const handleCriarTarefa = async (novaTarefa) => {
  const novasTarefas = [...tarefas, novaTarefa];
  setTarefas(novasTarefas);
  await salvarTarefas(novasTarefas, userEmail);
};

 useEffect(() => {
  const buscarEmail = async () => {
    const email = await AsyncStorage.getItem('loggedUserEmail');
    setUserEmail(email);
    if (email) carregarTarefas(email); // Carrega tarefas do usuário específico
  };
  buscarEmail();
}, []);

  const toggleCheck = (taskId) => {
    setSelectedTask(prev => prev === taskId ? null : taskId);
  };

  return (
    <>
      <ModalCriarTarefa
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCriarTarefa}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TASKLY</Text>
          <Image
            source={require('../../assets/imgs/avatar.png')}
            style={styles.logo3}
          />
        </View>

        <View style={styles.content}>
          {tarefas.length === 0 ? (
            <>
              <Image
                source={require('../../assets/icons/sadface.png')}
                style={styles.logo1}
              />
              <Text style={styles.message}>No momento você não possui tarefa</Text>
            </>
          ) : ( 
            tarefas.map((tarefa, index) => (
              <View key={index} style={styles.containerTesk}>
                
                <View  style={styles.contentTesk}>
                <View style={styles.tasktitle}>
                  <Text style={styles.txth1}>{tarefa.titulo}</Text>
                  <TouchableOpacity
                    style={styles.checkContainer}
                    onPress={() => toggleCheck(index)}
                  >
                    {selectedTask === index && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtp}>{tarefa.descricao}</Text>
                
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.txtbtn}>VER DETALHES</Text>
                </TouchableOpacity>
              </View>
              </View>
              
            ))
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Criar Tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
