import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import createStyles from './style';
import ModalCriarTarefa from '../../components/common/modalcriartarefa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
// --> NOVA IMPORTAÇÃO AQUI <--
import { S3_CONFIG, getS3FullAvatarUrl } from '../../config'; // Adicione getS3FullAvatarUrl aqui
import { authService } from '../../services/authService';

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  // --> MUDANÇA NA INICIALIZAÇÃO DO ESTADO <--
  const [avatarUrl, setAvatarUrl] = useState(getS3FullAvatarUrl(S3_CONFIG.DEFAULT_AVATAR_ID)); // Inicializa com a URL completa do avatar padrão

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
    const buscarEmailECarregarDados = async () => { // Nome da função ajustado
      setLoading(true);
      const email = await AsyncStorage.getItem('loggedUserEmail');
      setUserEmail(email || '');

      if (email) {
        try {
          const idToken = await AsyncStorage.getItem("idToken");
          if (idToken) {
            const profileData = await authService.getProfile(idToken);
            // --> MUDANÇA NA ATUALIZAÇÃO DO ESTADO <--
            setAvatarUrl(getS3FullAvatarUrl(profileData?.picture)); // Usa o helper com o 'picture' do backend
            console.log('Avatar ID from backend:', profileData?.picture); // Para verificar o ID
            console.log('Final Avatar URL in HomeScreen:', getS3FullAvatarUrl(profileData?.picture)); // Para verificar a URL final
          }
        } catch (error) {
          console.error('Erro ao carregar perfil na HomeScreen:', error);
          // Já que o avatarUrl foi inicializado com o padrão, não precisamos setar novamente aqui.
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
            source={{ uri: avatarUrl }} // AQUI! Continua usando 'avatarUrl' que agora está correta.
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
    </>
  );
}