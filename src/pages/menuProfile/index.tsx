import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useStyles from './style';

import { authService } from '../../services/authService';
import { S3_CONFIG, getS3FullAvatarUrl } from '../../config';

import LogoutConfirmationModal from '../../components/common/LogoutConfirmationModal';
import ToggleBiometricsModal from '../../components/common/ToggleBiometricsModal';
import AccountDeletionModal from '../../components/common/AccountDeletionModal';

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
    uid: string;
    name: string;
    email: string;
    phone_number?: string;
    picture?: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const { theme, currentThemeName } = useTheme();

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
  const handleCloseBiometricModal = () => setIsBiometricModal(false);

  const handleConfirmBiometricChange = (newState: boolean) => {
    setIsBiometricEnabled(newState);
    setIsBiometricModalVisible(false);
  };

  const handleOpenDeleteAccountModal = () => setIsAccountDeletionModalVisible(true);
  const handleCloseDeleteAccountModal = () => setIsAccountDeletionModalVisible(false);

  const handleConfirmDeleteAccount = async () => {
    try {
      const idToken = await AsyncStorage.getItem("idToken");

      if (!idToken) {
        Alert.alert("Erro", "Você não está logado ou o token expirou. Por favor, faça login novamente.");
        return;
      }

       await authService.deleteAccount(idToken);

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
        uid: profileData.uid,
        name: profileData.name || 'Nome não definido',
        email: profileData.email || 'Email não definido',
        phone_number: profileData.phone_number || '',
        picture: profileData.picture || S3_CONFIG.DEFAULT_AVATAR_ID,
      });

    } catch (error: any) {
      console.error('Erro ao carregar perfil:', error);
      Alert.alert("Erro", `Não foi possível carregar as informações do perfil: ${error.message}`);
      setUsuario(null);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useFocusEffect(loadUserProfile);

  const handleTermsAndConditionsPress = () => {
    navigation.navigate('WebView' as never, {
      url: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/',
    });
  };

  if (loadingProfile) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: theme.background,}}>
        <ActivityIndicator size="large" color={profileScreenLocalStyles.loadingIndicator.color || '#007bff'} />
        <Text style={profileScreenLocalStyles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={profileScreenLocalStyles.container}>
        <Text style={profileScreenLocalStyles.errorText}>Não foi possível carregar os dados do usuário. Por favor, tente novamente.</Text>
        <TouchableOpacity style={profileScreenLocalStyles.retryButton} onPress={loadUserProfile}>
          <Text style={profileScreenLocalStyles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const avatarToDisplay = getS3FullAvatarUrl(usuario.picture)
    ? `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/${usuario.picture}.png`
    : `${S3_CONFIG.BASE_URL}/${S3_CONFIG.AVATARS_PATH}/default_avatar.png`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatarToDisplay }}
            style={styles.avatar}
            onError={(e) => console.log('Erro ao carregar avatar na ProfileScreen:', e.nativeEvent.error)}
          />
        </View>
        <Text style={styles.name}>{usuario.name}</Text> {}
        <Text style={styles.email}>{usuario.email}</Text>
        <Text style={styles.phone}>{formatPhoneNumber(usuario.phone_number)}</Text> {}
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

const profileScreenLocalStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    color: '#007bff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  container: {
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