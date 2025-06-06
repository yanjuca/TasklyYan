import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import createStyles from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import { S3_CONFIG } from '../../config';
import { authService } from '../../services/authService'; // Import authService

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(S3_CONFIG.DEFAULT_AVATAR); // Add state for avatar URL

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
        setTarefas(JSON.parse(dadosSalvos));
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
    const novasTarefas = [...tarefas, novaTarefa];
    setTarefas(novasTarefas);
    await salvarTarefas(novasTarefas, userEmail);
    setModalVisible(false);
  };

  useEffect(() => {
    const buscarEmailECarregarTarefas = async () => {
      setLoading(true);
      const email = await AsyncStorage.getItem('loggedUserEmail');
      setUserEmail(email || '');

      // Fetch user profile to get avatar URL
      if (email) {
        try {
          const idToken = await AsyncStorage.getItem("idToken");
          if (idToken) {
            const profileData = await authService.getProfile(idToken);
            setAvatarUrl(profileData?.avatar_url || S3_CONFIG.DEFAULT_AVATAR);
          }
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
          // Keep the default avatar in case of error
        }
        await carregarTarefas(email);
      } else {
        setTarefas([]);
        setLoading(false);
      }
    };
    buscarEmailECarregarTarefas();
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <>
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
            source={{ uri: avatarUrl }} // Use the avatarUrl state here
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
            tarefas.map((tarefa, index) => (
              <View key={index} style={styles.containerTesk}>
                <View style={styles.contentTesk}>
                  <View style={styles.tasktitle}>
                    <Text style={[styles.txth1, tarefa.concluida && styles.taskCompletedText]}>{tarefa.titulo}</Text>
                    <TouchableOpacity
                      style={[styles.checkContainer, tarefa.concluida && styles.checkContainerChecked]}
                      onPress={() => toggleCheck(index)}
                    >
                      {tarefa.concluida && <Text style={styles.checkMark}>✓</Text>}
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.txtp, tarefa.concluida && styles.taskCompletedText]}>{tarefa.descricao}</Text>

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