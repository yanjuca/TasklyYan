import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCriarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, novaTarefa]);
  };

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
              <View style={styles.containerTesk}>
                <View key={index} style={styles.contentTesk}>
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
