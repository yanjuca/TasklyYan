import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../pages/preferencesMenu/themeContext';
import getStyles from './style';

export default function PreferencesMenu() {
  const navigation = useNavigation();
  const { theme, setTheme, currentThemeName } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(currentThemeName);
  const themeText = currentThemeName === 'dark' ? 'Habilitar Tema Claro' : 'Habilitar Tema Escuro';
  const styles = getStyles(theme);

  const handleConfirmTheme = () => {
    if (selectedTheme !== currentThemeName) {
      setTheme(selectedTheme);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}> ＜  VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferências</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.button}>
          <Text style={styles.cardText}>{themeText}</Text>
          <Text style={styles.arrow}>＞</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha o tema</Text>
            <View style={styles.themeOptions}>
              <TouchableOpacity
                style={[styles.themeBox, selectedTheme === 'dark' && styles.selected]}
                onPress={() => setSelectedTheme('dark')}
              >
                <Image
                  source={require('../../assets/imgs/darkMode.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.themeBox, selectedTheme === 'light' && styles.selected]}
                onPress={() => setSelectedTheme('light')}
              >
                <Image
                  source={require('../../assets/imgs/lightMode.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Agora não</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmTheme}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}