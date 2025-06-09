import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import createStyles from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import { S3_CONFIG, getS3FullAvatarUrl } from '../../config';
import { authService } from '../../services/authService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TaskItem from '../../components/common/TaskItem';

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(getS3FullAvatarUrl(S3_CONFIG.DEFAULT_AVATAR_ID));

  const salvarTarefas = async (dados, email) => {
    if (!email) return;
    try {
      await AsyncStorage.setItem(`tarefas_${email}`, JSON.stringify(dados));
    } catch (error) {
      Alert.alert("Erro ao salvar tarefas", error.message);
    }
  };

  const carregarTarefas = async (email) => {
    if (!email) {
      setTarefas([]);
      setLoading(false);
      return;
    }
    try {
      const dadosSalvos = await AsyncStorage.getItem(`tarefas_${email}`);
      if (dadosSalvos) {
        const tarefasCarregadas = JSON.parse(dadosSalvos);
        const tarefasComId = tarefasCarregadas.map(tarefa => ({
          ...tarefa,
          id: tarefa.id || Date.now().toString() + Math.random().toString().substring(2, 8)
        }));
        setTarefas(tarefasComId);
      } else {
        setTarefas([]);
      }
    } catch (erro) {
      console.log('Erro ao carregar tarefas:', erro);
      setTarefas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarTarefa = async (novaTarefa) => {
    const tarefaComId = {
      ...novaTarefa,
      id: Date.now().toString(),
    };
    const novasTarefas = [...tarefas, tarefaComId];
    setTarefas(novasTarefas);
    await salvarTarefas(novasTarefas, userEmail);
    setModalVisible(false);
  };

  useEffect(() => {
    const buscarEmailECarregarDados = async () => {
      setLoading(true);
      const email = await AsyncStorage.getItem('loggedUserEmail');
      setUserEmail(email || '');

      if (email) {
        try {
          const idToken = await AsyncStorage.getItem("idToken");
          if (idToken) {
            const profileData = await authService.getProfile(idToken);
            setAvatarUrl(getS3FullAvatarUrl(profileData?.picture));
            console.log('Avatar ID from backend:', profileData?.picture);
            console.log('Final Avatar URL in HomeScreen:', getS3FullAvatarUrl(profileData?.picture));
          }
        } catch (error) {
          console.error('Erro ao carregar perfil na HomeScreen:', error);
        }
        await carregarTarefas(email);
      } else {
        setTarefas([]);
        setLoading(false);
      }
    };
    buscarEmailECarregarDados();
  }, []);

  const toggleCheck = async (taskIndex) => {
    const novasTarefas = tarefas.map((tarefa, index) => {
      if (index === taskIndex) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
    await salvarTarefas(novasTarefas, userEmail);
    setSelectedTask(prev => prev === taskIndex ? null : taskIndex);
  };

  const removerTarefa = async (idTarefa) => {
    Alert.alert(
      "Excluir Tarefa",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            const novasTarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa);
            setTarefas(novasTarefas);
            await salvarTarefas(novasTarefas, userEmail);
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalCriarTarefa
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCriarTarefa}
        theme={theme}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TASKLY</Text>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.logo3}
            onError={(e) => console.log('Erro ao carregar avatar na HomeScreen:', e.nativeEvent.error)}
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
            <ScrollView>
              {tarefas.map((tarefa, index) => (
                <TaskItem
                  key={tarefa.id} 
                  tarefa={tarefa}
                  index={index}
                  theme={theme}
                  toggleCheck={toggleCheck}
                  onDelete={removerTarefa}
                  styles={styles}
                />
              ))}
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Criar Tarefa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}