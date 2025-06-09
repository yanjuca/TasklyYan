import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import styles from './style'; // Certifique-se de que este é o caminho correto para seus estilos
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { S3_CONFIG } from '../../config'; // Importar S3_CONFIG
import { authService } from '../../services/authService'; // Importar authService

// Definir as tipagens para as rotas, se você usa React Navigation.
// Certifique-se de que 'Tab' é o nome da sua rota para a tela principal (bottom tabs ou similar)
type RootStackParamList = {
  AvatarSelectionScreen: { userId: string; idToken: string };
  Tab: undefined; // Ou o tipo correto da sua tela principal
};

type AvatarSelectionScreenRouteProp = RouteProp<RootStackParamList, 'AvatarSelectionScreen'>;

interface Avatar {
  id: number;
  imageUrl: string; // Agora é uma string (URL do S3)
  borderColor: string;
}

const AvatarSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AvatarSelectionScreenRouteProp>();
  const { userId, idToken } = route.params; // Obter userId e idToken dos parâmetros

  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  // Avatares com URLs completas do S3
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

    // NOTA: A linha abaixo não é mais estritamente necessária para enviar ao backend,
    // pois estamos enviando apenas o 'selectedAvatarId' numérico.
    // Ela pode ser útil se você precisar de outras propriedades do avatar no frontend.
    const selectedAvatar = avatars.find(avatar => avatar.id === selectedAvatarId);
    if (!selectedAvatar) {
      Alert.alert("Erro", "Avatar selecionado inválido.");
      return;
    }

    setIsLoading(true); // Ativa o loading

    try {
      console.log('Enviando avatar para o backend:', {
        userId: userId, // 'userId' é passado, mas o backend PUT /profile o ignora (usa o token)
        selectedAvatarId: selectedAvatarId, // Este é o ID numérico que será enviado ao backend
        idToken: idToken
      });

      // *** AQUI ESTÁ A MUDANÇA PRINCIPAL ***
      // Chamamos authService.selectDefaultAvatar com o ID numérico do avatar
      // e o idToken. A função authService.selectDefaultAvatar (que você também precisa atualizar)
      // se encarregará de formatar isso como "avatar_1", "avatar_2", etc.
      await authService.selectDefaultAvatar(userId, selectedAvatarId, idToken);

      Alert.alert("Sucesso", "Avatar definido com sucesso!");
      // Navegar para a tela principal, usando 'as never' se a tipagem não estiver configurada globalmente
      navigation.navigate("Tab" as never);
    } catch (error: any) {
      console.error('Erro ao definir avatar na API:', error);
      Alert.alert("Erro", error.message || "Não foi possível definir o avatar.");
    } finally {
      setIsLoading(false); // Desativa o loading
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
              selectedAvatarId === avatar.id && styles.selectedAvatarOutline // Estilo de borda para selecionado
            ]}
            onPress={() => handleAvatarPress(avatar.id)}
            disabled={isLoading} // Desabilita botões de seleção durante o carregamento
          >
            <Image
              source={{ uri: avatar.imageUrl }} // Carregar imagem do S3
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
        disabled={isLoading || selectedAvatarId === null} // Desabilita se estiver carregando ou nenhum avatar selecionado
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