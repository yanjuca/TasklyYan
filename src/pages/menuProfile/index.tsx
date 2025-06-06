import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native'; // Adicionar StyleSheet
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Mantenha o useStyles() NO TOPO DO COMPONENTE
import useStyles from './style'; // Mantenha este import

// Importar o authService e S3_CONFIG
import { authService } from '../../services/authService';
import { S3_CONFIG } from '../../config';

import LogoutConfirmationModal from '../../components/common/LogoutConfirmationModal';
import ToggleBiometricsModal from '../../components/common/ToggleBiometricsModal';
import AccountDeletionModal from '../../components/common/AccountDeletionModal';

// Seus ícones de acordo com o tema
import UserIconDark from '../../assets/icons/User.png';
import UserIconLight from '../../assets/icons/UserLight.png';
import FingerprintIconDark from '../../assets/icons/menu/FingerprintSimple.png';
import FingerprintIconLight from '../../assets/icons/menu/FingerprintSimpleLight.png';
import LogoutIconDark from '../../assets/icons/menu/SignOut.png';
import LogoutIconLight from '../../assets/icons/menu/SignOutLight.png';
import ChevronRightIcon from '../../assets/icons/ChevronRight.png';
import DeleteAccIconDark from '../../assets/icons/menu/Trash.png';
import DeleteAccIconLight from '../../assets/icons/TrashLight.png';


const formatPhoneNumber = (phoneNumber?: string | null) => {
  if (!phoneNumber) {
    return '';
  }
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} - ${match[3]}`;
  }
  return cleaned;
};

interface UserProfile {
    id: string;
    nome: string;
    email: string;
    numero?: string;
    avatar_url?: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  // MUDANÇA PRINCIPAL: Chame useStyles() AQUI, ANTES DE QUALQUER RETORNO CONDICIONAL.
  const styles = useStyles();
  const { currentThemeName } = useTheme();

  const [isLogoutConfirmationModalVisible, setIsLogoutConfirmationModalVisible] = useState(false);
  const [isBiometricModalVisible, setIsBiometricModalVisible] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isAccountDeletionModalVisible, setIsAccountDeletionModalVisible] = useState(false);

  const [usuario, setUsuario] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const getIcon = (iconName: string) => {
    if (currentThemeName === 'dark') {
      switch (iconName) {
        case 'user': return UserIconDark;
        case 'fingerprint': return FingerprintIconDark;
        case 'logout': return LogoutIconDark;
        case 'delete': return DeleteAccIconDark;
        default: return null;
      }
    } else {
      switch (iconName) {
        case 'user': return UserIconLight;
        case 'fingerprint': return FingerprintIconLight;
        case 'logout': return LogoutIconLight;
        case 'delete': return DeleteAccIconLight;
        default: return null;
      }
    }
  };

  const handleEditProfilePress = () => {
    navigation.navigate('profileEdit' as never);
  };

  const handlePreferencesPress = () => {
    navigation.navigate('PreferencesMenu' as never);
  };

  const handleLogoutPress = () => {
    setIsLogoutConfirmationModalVisible(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmationModalVisible(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["idToken", "refreshToken", "loggedUserEmail", "loggedUserNome", "loggedUserNumero"]);

      navigation.reset({
        index: 0,
        routes: [{ name: 'SingIn' }],
      });
      setIsLogoutConfirmationModalVisible(false);
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
      Alert.alert("Erro", "Ocorreu um erro ao deslogar.");
    }
  };

  const handleOpenBiometricModal = () => setIsBiometricModalVisible(true);
  const handleCloseBiometricModal = () => setIsBiometricModalVisible(false);

  const handleConfirmBiometricChange = (newState: boolean) => {
    setIsBiometricEnabled(newState);
    setIsBiometricModalVisible(false);
  };

  const handleOpenDeleteAccountModal = () => setIsAccountDeletionModalVisible(true);
  const handleCloseDeleteAccountModal = () => setIsAccountDeletionModal(false);

  const handleConfirmDeleteAccount = async () => {
    try {
      const idToken = await AsyncStorage.getItem("idToken");

      if (!idToken) {
        Alert.alert("Erro", "Você não está logado ou o token expirou. Por favor, faça login novamente.");
        return;
      }

      // TODO: Implementar a chamada ao backend para exclusão da conta
      // Exemplo: await authService.deleteAccount(idToken);
      Alert.alert("Aviso", "A funcionalidade de exclusão de conta ainda não está implementada no backend. Por favor, entre em contato com o suporte.");
      setIsAccountDeletionModalVisible(false);
      return;

      // --- As linhas abaixo só devem ser executadas APÓS a confirmação do backend ---
      await AsyncStorage.multiRemove(["idToken", "refreshToken", "loggedUserEmail", "loggedUserNome", "loggedUserNumero"]);

      navigation.reset({
        index: 0,
        routes: [{ name: 'SingIn' }],
      });
      setIsAccountDeletionModalVisible(false);
      Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso.")

    } catch (error) {
      console.error("Erro ao excluir a conta:", error);
      Alert.alert("Erro", "Ocorreu um erro ao excluir sua conta.");
    }
  };

  const loadUserProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const idToken = await AsyncStorage.getItem("idToken");

      if (!idToken) {
        console.warn('ID Token não encontrado. Usuário não logado ou sessão expirada.');
        setUsuario(null);
        return;
      }

      const profileData = await authService.getProfile(idToken);
      console.log('Dados do perfil recebidos:', profileData);

      setUsuario({
        id: profileData.id,
        nome: profileData.name || 'Nome não definido',
        email: profileData.email || 'Email não definido',
        numero: profileData.phone_number || '',
        avatar_url: profileData.avatar_url || S3_CONFIG.DEFAULT_AVATAR,
      });

    } catch (error: any) {
      console.error('Erro ao carregar perfil:', error);
      Alert.alert("Erro", `Não foi possível carregar as informações do perfil: ${error.message}`);
      setUsuario(null);
    } finally {
      setLoadingProfile(false);
    }
  }, []); // Dependências vazias pois loadUserProfile agora é envolvida por useCallback

  useFocusEffect(loadUserProfile); // Chama loadUserProfile quando a tela é focada

  const handleTermsAndConditionsPress = () => {
    navigation.navigate('WebView' as never, {
      url: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/',
    });
  };

  // MUDANÇA: Os estilos 'loadingIndicator', 'loadingText', etc. precisam estar definidos
  // no seu arquivo 'style.ts' (ou onde 'useStyles' os obtém)
  // ou em um StyleSheet.create local (que é o que vamos fazer aqui).

  if (loadingProfile) {
    return (
      <View style={profileScreenLocalStyles.loadingContainer}> {/* Usar estilos locais */}
        <ActivityIndicator size="large" color={profileScreenLocalStyles.loadingIndicator.color || '#007bff'} /> {/* Cor padrão ou do tema */}
        <Text style={profileScreenLocalStyles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={profileScreenLocalStyles.container}> {/* Usar estilos locais */}
        <Text style={profileScreenLocalStyles.errorText}>Não foi possível carregar os dados do usuário. Por favor, tente novamente.</Text>
        <TouchableOpacity style={profileScreenLocalStyles.retryButton} onPress={loadUserProfile}>
          <Text style={profileScreenLocalStyles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> {/* Estes estilos virão do useStyles() */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: usuario.avatar_url || S3_CONFIG.DEFAULT_AVATAR }}
            style={styles.avatar}
            onError={(e) => console.log('Erro ao carregar avatar na ProfileScreen:', e.nativeEvent.error)}
          />
        </View>
        <Text style={styles.name}>{usuario.nome}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
        <Text style={styles.phone}>{formatPhoneNumber(usuario.numero)}</Text>
      </View>

      <ScrollView
        style={styles.actionsScrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsContainer}
      >
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfilePress}>
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>Editar Informações Pessoais</Text>
            <Image source={getIcon('user')} style={styles.actionIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleOpenBiometricModal}>
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>Mudar Biometria</Text>
            <Image source={getIcon('fingerprint')} style={styles.actionIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogoutPress}>
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>Sair da Conta</Text>
            <Image source={getIcon('logout')} style={styles.actionIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleOpenDeleteAccountModal}>
          <View style={styles.actionContent}>
            <Text style={styles.actionText}>Excluir Conta</Text>
            <Image source={getIcon('delete')} style={styles.actionIcon} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handlePreferencesPress}>
          <Text style={styles.menuText}>Preferências</Text>
          <Image source={ChevronRightIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleTermsAndConditionsPress}>
          <Text style={styles.menuText}>Termos e regulamentos</Text>
          <Image source={ChevronRightIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {isLogoutConfirmationModalVisible && (
        <LogoutConfirmationModal
          isVisible={isLogoutConfirmationModalVisible}
          onCancel={handleCancelLogout}
          onConfirm={handleConfirmLogout}
        />
      )}

      {isBiometricModalVisible && (
        <ToggleBiometricsModal
          isVisible={isBiometricModalVisible}
          isBiometricEnabled={isBiometricEnabled}
          onCancel={handleCloseBiometricModal}
          onConfirm={handleConfirmBiometricChange}
        />
      )}

      {isAccountDeletionModalVisible && (
        <AccountDeletionModal
          isVisible={isAccountDeletionModalVisible}
          onCancel={handleCloseDeleteAccountModal}
          onConfirm={handleConfirmDeleteAccount}
        />
      )}
    </View>
  );
};

// **IMPORTANTE**: Estes estilos são locais para a ProfileScreen e para os estados de carregamento/erro.
// Você PODE mesclá-los com seu arquivo `style.ts` se preferir ter todos os estilos em um só lugar
// para esta tela, mas esta é uma forma de garantir que eles estejam disponíveis imediatamente.
const profileScreenLocalStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cor de fundo padrão para o estado de carregamento
  },
  loadingIndicator: {
    color: '#007bff', // Cor padrão para o ActivityIndicator
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  container: { // Este container é apenas para o caso de erro/retry
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;