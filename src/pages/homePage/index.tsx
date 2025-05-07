import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';
 
import ModalCriarTarefa from '../../components/common/modalcriartarefa';


export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <><ModalCriarTarefa visible={modalVisible} onClose={() => setModalVisible(false)} /><View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>TASKLY</Text>
        <Image
          source={require('../../assets/imgs/avatar.png')}
          style={styles.logo3} />
      </View>


      <View style={styles.content}>
        <Image
          source={require('../../assets/icons/sadface.png')}
          style={styles.logo1} />
        <Text style={styles.message}>No momento você não possui tarefa</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Criar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </View></>
  );
}