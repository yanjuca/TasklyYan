// src/pages/avatarSelect/index.tsx

import { useState, useEffect } from 'react'; // Adicionar useEffect
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import styles from './style';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

import { S3_CONFIG } from '../../config';
import { authService } from '../../services/authService';

type RootStackParamList = {
  AvatarSelectionScreen: { userId: string; idToken: string };
  Tab: undefined;
};

type AvatarSelectionScreenRouteProp = RouteProp<RootStackParamList, 'AvatarSelectionScreen'>;

interface Avatar {
  id: number;
  imageUrl: string;
  borderColor: string;
}

const AvatarSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AvatarSelectionScreenRouteProp>();
  // Não vamos mais usar userId dos params diretamente aqui, mas sim o idToken.
  // O userId será recuperado via AsyncStorage ou se necessário, o backend pode usar o UID do token.
  const { idToken } = route.params;

  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string>(''); // Novo estado para o nome do usuário
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>(''); // Novo estado para o número do usuário

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('loggedUserNome');
        const storedPhoneNumber = await AsyncStorage.getItem('loggedUserNumero');
        if (storedName) setUserName(storedName);
        if (storedPhoneNumber) setUserPhoneNumber(storedPhoneNumber);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário do AsyncStorage:', error);
      }
    };
    loadUserData();
  }, []);

  const avatars: Avatar[] = [
    { id: 1, imageUrl: `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/avatar_1.png`, borderColor: '#5B3CC4' },
    { id: 2, imageUrl: `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/avatar_2.png`, borderColor: '#E6E0F7' },
    { id: 3, imageUrl: `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/avatar_3.png`, borderColor: '#32C25B' },
    { id: 4, imageUrl: `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/avatar_4.png`, borderColor: '#E63946' },
    { id: 5, imageUrl: `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/avatar_5.png`, borderColor: '#B58B46' },
  ];

  const handleAvatarPress = (id: number) => {
    setSelectedAvatarId(id);
  };

  const handleConfirmSelection = async () => {
    if (!selectedAvatarId) {
      Alert.alert("Erro", "Por favor, selecione um avatar para continuar.");
      return;
    }

    // Se o nome ou número não foram carregados, o backend rejeitará.
    // Você pode adicionar uma validação aqui, ou garantir que esses campos sempre sejam preenchidos no registro.
    if (!userName || !userPhoneNumber) {
        Alert.alert("Erro", "Dados do usuário (nome/número) não carregados. Tente novamente.");
        return;
    }

    setIsLoading(true);

    try {
      console.log('Enviando avatar para o backend:', {
        selectedAvatarId: selectedAvatarId,
        idToken: idToken,
        name: userName, // <-- ENVIANDO NOME
        phone_number: userPhoneNumber // <-- ENVIANDO NÚMERO
      });

      // *** MUDANÇA AQUI: Passar userName e userPhoneNumber ***
      await authService.selectDefaultAvatar(selectedAvatarId, idToken, userName, userPhoneNumber);

      Alert.alert("Sucesso", "Avatar definido com sucesso!");
      navigation.navigate("Tab" as never);
    } catch (error: any) {
      console.error('Erro ao definir avatar na API:', error);
      Alert.alert("Erro", error.message || "Não foi possível definir o avatar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SELECIONE SEU AVATAR</Text>
        <Text style={styles.subtitle}>(Escolha somente um.)</Text>
      </View>

      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarButton,
              { borderColor: avatar.borderColor },
              selectedAvatarId === avatar.id && styles.selectedAvatarOutline
            ]}
            onPress={() => handleAvatarPress(avatar.id)}
            disabled={isLoading}
          >
            <Image
              source={{ uri: avatar.imageUrl }}
              style={[
                styles.avatarImage,
                selectedAvatarId !== avatar.id && styles.deselectedAvatarImage,
              ]}
              onError={(e) => console.log('Erro ao carregar avatar do S3:', e.nativeEvent.error)}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmSelection}
        disabled={isLoading || selectedAvatarId === null}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>CONFIRMAR SELEÇÃO</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AvatarSelectionScreen;