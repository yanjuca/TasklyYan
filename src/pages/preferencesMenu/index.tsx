import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from './style';  

export default function PreferencesScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Topo com botão voltar e título */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}> ＜  VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferências</Text>
      </View>

      {/* Card de tema */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.cardText}>Habilitar Tema Claro</Text>
        <Text style={styles.arrow}>＞</Text>
      </TouchableOpacity>

      {/* Modal de escolha de tema */}
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
              <View style={styles.themeBox}>
                <Image 
                  source={require('../../assets/imgs/darkMode.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <View style={[styles.themeBox, styles.selected]}>
                <Image 
                  source={require('../../assets/imgs/lightMode.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
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
                onPress={() => setModalVisible(false)}
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